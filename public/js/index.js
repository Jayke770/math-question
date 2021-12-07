$(document).ready( () => {
    $("#question").submit( function (e) {
        e.preventDefault() 
        const data = $(this).serializeArray() 
        const {status, answer} = math.solve(data[0].value)
        $("#answer").text(answer)
        $(this).trigger("reset")
    })

    const math = {
        solve: (str) => {
            const operators = [
                {
                    type: ["added", "total", "plus", "increase", "+"], 
                    op: "+"
                }, 
                {
                    type: ["minus", "decrease", "take away", "difference"], 
                    op: "-"
                }, 
                {
                    type: ["multiplied by", "product", "multiply"], 
                    op: "*"
                }, 
                {
                    type: ["devide"], 
                    op: "/"
                }
            ]
            let selectedOperator, numbers = []
    
            try {
                if(typeof str === "string") {
                    for(let i = 0; i < operators.length; i++){
                        for(let op = 0; op < operators[i].type.length; op++){
                            if(str.toLowerCase().search(operators[i].type[op]) !== -1){
                                selectedOperator = operators[i].op 
                                break
                            }
                        }
                    }
                
                    for(let i = 0; i < str.split(" ").length; i++){
                        if(parseInt(str.split(" ")[i])){
                            numbers.push(parseInt(str.split(" ")[i]))
                        }
                    }
                    if(numbers.length === 2){
                        return {
                            status: true, 
                            answer: eval(`${numbers[0]} ${selectedOperator} ${numbers[1]}`)
                        }
                    } else {
                       throw new Error("Invalid Question")
                    }
                } else {
                    throw new Error("Invalid Question")
                }
            } catch (e) {
                return {
                    status: false, 
                    error: e,
                    answer: "Invalid Question"
                }
            }
        }
    }
})