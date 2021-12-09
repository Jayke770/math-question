$(document).ready( () => {
    $("#question").submit( function (e) {
        e.preventDefault() 
        const data = $(this).serializeArray() 
        const {status, answer} = math.solve(data[0].value)
        $("#answer").text(answer)
        if(status){
            //copy answer to clipboard 
            const textFeild = document.querySelector("textarea[name='question']")
            textFeild.value = answer
            textFeild.select() 
            textFeild.setSelectionRange(0, 99999)
            navigator.clipboard.writeText(textFeild.value)
            Snackbar.show({ 
                text: `
                    <div class="flex justify-center items-center gap-2"> 
                        <i style="font-size: 1.25rem; color: rgba(34, 197, 94, 1);" class="fad fa-info-circle"></i>
                        <span>Answer Copied Clipboard</span>
                    </div>
                `, 
                duration: 3000,
                showAction: false
            })  
            $(this).trigger("reset")
        }
    })

    const math = {
        solve: (str) => {
            const operators = [
                {
                    type: ["added", "total", "plus", "increase", "and", "increase by", "take in"], 
                    op: "+"
                }, 
                {
                    type: ["minus", "decrease", "take away", "difference", "take out"], 
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