function solve(input){
    let myText = input.shift();
    let commandLine = input.shift();
    while (commandLine !== 'Reveal') {
        let [command, firstArgument, secondArgument] = commandLine.split(':|:');
        if (command === 'InsertSpace') {
            myText = (myText.substring(0, firstArgument)) + ' ' + (myText.substring(firstArgument));
            console.log(myText);
        }else if (command === 'Reverse') {
            if (myText.includes(firstArgument)) {
                myText = myText.replace(firstArgument, '');
                let reverseStr = firstArgument.split('').reverse().join('');
                myText = myText.concat(reverseStr);
                console.log(myText);
            }else{
                console.log('error');
            }
        }else if (command === 'ChangeAll') {
            while (myText.includes(firstArgument)) {
                myText = myText.replace(firstArgument, secondArgument);
            }
            console.log(myText);
        }
        commandLine = input.shift();
    }
    console.log(`You have a new text message: ${myText}`);
}

solve([
    'heVVodar!gniV',
    'ChangeAll:|:V:|:l',
    'Reverse:|:!gnil',
    'InsertSpace:|:5',
    'Reveal']);