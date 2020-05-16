module.exports = {
  AppAction: {
    START: 'start',
    STOP: 'stop',
    RESTART: 'restart',
    RELOAD: 'reload',
    DELETE: 'delete'
  },

  AppStatus: {
    ONLINE: 'online',
    STOPPING: 'stopping',
    STOPPED: 'stopped',
    LAUNCHING: 'launching',
    ERRORED: 'errored',
    ONE_LAUNCH: 'one-launch-status'
  },

  ExecMode: {
    CLUSTER: 'cluster_mode',
    FORK: 'fork_mode'
  }
}
