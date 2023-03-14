// http모듈을 추출합니다.
const http = require("http");

const server = http.createServer();

server.listen(3001, function () {
  console.log("3001번 포트로 서버가 실행되었습니다.");
});
