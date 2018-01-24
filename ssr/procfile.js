module.exports = function (pandora) {

  // 定义两个进程
  pandora
    .process('agent')
    .scale(1);
  pandora
    .process('work')
    .scale(2);

  // 定义 ServiceA 在 进程 a
  pandora
    .service('agentServer', './agent.js')
    .process('agent')
    // 标识 serviceA 发布到 IPC-Hub 中
    .publish();

  // 定义 ServiceB 在进程 b
  pandora
    .service('workerServer', './worker.js')
    .process('worker');

}
