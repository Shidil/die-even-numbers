const http = require("http");
const { getRandomId } = require("./shared/getRandomId");
const { findNthValue } = require("./shared/increment");

const callIncrement = async (id) => {
  const data = JSON.stringify({
    id,
  });

  const options = {
    hostname: "localhost",
    port: 8000,
    path: "/increment-value",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data),
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      res.resume();
      res.on("end", () => {
        if (!res.complete) {
          reject(
            "The connection was terminated while the message was still being sent"
          );
        } else {
          resolve();
        }
      });
    });

    req.on("error", (e) => {
      reject(e);
    });

    req.write(data);
    req.end();
  });
};

const callGetValue = async (id) => {
  return new Promise((resolve, reject) => {
    const req = http.get("http://localhost:8000/get-value?id=" + id, (res) => {
      res.setEncoding("utf8");
      let rawData = "";
      res.on("data", (chunk) => {
        rawData += chunk;
      });
      res.on("end", () => {
        try {
          resolve(JSON.parse(rawData));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on("error", (e) => {
      reject(e);
    });
  });
};

const sleep = async (ms) => {
  await new Promise((r) => setTimeout(r, ms));
};

describe("e2e - api", () => {
  test("/get-value for non existent ids results in 0", async () => {
    const res = await callGetValue("non_existent" + Math.random());
    expect(res.result).toEqual(0);
  });

  test("/increment-value starts new records with 1", async () => {
    const id = getRandomId();
    await callIncrement(id);
    expect(await callGetValue(id)).toEqual({ success: true, result: 1 });
  });

  test("/increment-value handles concurrency", async () => {
    const id = getRandomId();
    const requests = new Array(5).fill(id).map(callIncrement);
    await Promise.all(requests);

    expect(await callGetValue(id)).toEqual({
      success: true,
      result: findNthValue(5),
    });
  });

  test("values above 10 and those are even gets removed", async () => {
    const survivor = getRandomId();
    let requests = new Array(7).fill(survivor).map(callIncrement);
    await Promise.all(requests);

    // should get removed, as findNthValue(8) is 14
    const victim1 = getRandomId();
    requests = new Array(8).fill(victim1).map(callIncrement);
    await Promise.all(requests);

    const victim2 = getRandomId();

    // Fire requests for 10s every 100 requests per second, stress system
    const interval = setInterval(() => {
      callIncrement(victim2);
    }, 10); // fire a new request every 10s

    await sleep(10 * 1000);
    clearInterval(interval);

    // worker for deleting 10 above even is scheduled for 10s
    // wait 12s to be sure
    await sleep(12 * 1000);

    // record with id survivor should have value = 11, which should survive
    expect(await callGetValue(survivor)).toEqual({
      success: true,
      result: findNthValue(7),
    });

    expect(await callGetValue(victim1)).toEqual({
      success: true,
      result: 0,
    });

    const victim2Value = (await callGetValue(victim2)).result;

    // if it survived it must be an odd number
    if (victim2Value) {
      expect(victim2Value % 2).not.toBe(0);
    }
  }, 30000);
});
