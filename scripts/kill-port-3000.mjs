import { execSync } from "node:child_process";

try {
  const out = execSync('netstat -ano | findstr :3000 | findstr LISTENING', {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "ignore"],
  });
  const pids = new Set(
    out
      .split("\n")
      .map((line) => line.trim().split(/\s+/).pop())
      .filter((pid) => pid && /^\d+$/.test(pid))
  );
  for (const pid of pids) {
    try {
      execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
      console.log(`Port 3000: process ${pid} stopped.`);
    } catch {
      /* already gone */
    }
  }
  if (pids.size === 0) console.log("Port 3000 is free.");
} catch {
  console.log("Port 3000 is free.");
}
