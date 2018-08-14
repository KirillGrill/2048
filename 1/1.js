function sorting()
{
    var number;

    var arr = [];

    for(var i = 0; i < 3;)
    {
        number = prompt("Enter three number", "");
        if(number === null){
            return;
        }
        if( !isNaN(number)&&(number !=""))
        {
            arr[i]=+number;
            ++i;
        }
        else
        {
            alert("you must type number");
        }
    }

    var box;

    var counter = 1;

    for(var i = 0;i < 3; ++i ){
        for(var j = 0; j < 3 - i; ++j){
            if(arr[j]>arr[j+1]){
                box = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = box;
            }
        }
    }

    for(i = 0; i < 3; ++i){
        if(arr[i] === arr[i+1])
        {
            counter++;
        }
    }

    if(counter == 1){

        counter = 0;
    }

    console.log (arr[0], arr[1], arr[2], counter,"of numbers are similar");
}

sorting();