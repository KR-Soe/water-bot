class Reminder {
  constructor(delay, msg) {
    this.delay = delay;
    this.msg = msg
  };

  sendMessage(message){
    const timeout = () => {
      const timerDelay = this.delay;
      const imageUrl = 'https://media.tenor.com/images/44ca314f576af15292016321ae4e5970/tenor.png'
      setTimeout(() => {
          this.msg.channel.send(message, {files:[imageUrl]});
          timeout();
      }, timerDelay)
    }
    timeout();
  }
};

module.exports = Reminder;