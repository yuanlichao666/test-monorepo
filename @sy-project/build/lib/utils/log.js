import chalk from 'chalk';

/**
 * 打印错误信息
 * @param {Error} error - 要打印的错误对象
 */
export  function logError(error) {
    if (!error || !(error instanceof Error)) {
        console.log(chalk.red('Invalid error object provided.'));
        return;
    }

    console.log('\n' + chalk.bgRed.white.bold(' ERROR ') + '\n'); // 显示 "ERROR" 标题

    // 打印错误类型
    if (error.name) {
        console.log(chalk.red.bold('Type: ') + chalk.yellow(error.name));
    }

    // 打印错误消息
    if (error.message) {
        console.log(chalk.red.bold('Message: ') + chalk.cyan(error.message));
    }

    // 打印堆栈信息
    if (error.stack) {
        console.log(chalk.red.bold('\nStack Trace:\n'));
        console.log(chalk.gray(error.stack));
    }

    console.log(); // 添加换行
}

