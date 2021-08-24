const editor = document.querySelector(".code-editor");
const showPanel = document.querySelector(".blocks-show-screen");
const addBtn = document.querySelector(".add-block"); 
const deleteBtn = document.querySelector(".delete-block");
var block = document.querySelector(".block");
var messageBoxBlock = document.querySelector(".message-box");
let cssCodesList = {};

var blockList = [
    {
        blockElement: block,
        cssCode: ""
    }
]

var lastSelectedIndex = 0;
var lastAdded = 1;
let isDeleted = false;


showPanel.addEventListener("click", (e) => {
    if(e.target.classList.contains("block")){
        blockList.map(block => block.blockElement).forEach((block, index) => {
            block.onclick = () => {
                selectBlock(index);
                console.log(index);
            };
        })
    }
});
          
function addBlockButton() {
    addBtn.addEventListener("click", () => {
        let newBlock = document.createElement("div");
        newBlock.className = "block";
        newBlock.innerText = `Block ${lastAdded}`;
        lastAdded++;
        showPanel.append(newBlock);
        let newBlockObject = {
            blockElement: newBlock,
            cssCode: ""
        }
        blockList.push(newBlockObject);
        messageBox("Block added!", "success");
    });
}

function deleteBlockButton() {
    deleteBtn.addEventListener("click", () => {
        if(blockList.length){
            console.log(lastSelectedIndex);
            showPanel.removeChild(blockList[lastSelectedIndex].blockElement);  
            blockList.splice(lastSelectedIndex, 1);
            lastSelectedIndex--;
            lastSelectedIndex = lastSelectedIndex == -1 ? 0 : lastSelectedIndex;
            document.querySelector(".code-editor").value = "";
            isDeleted = true;
        }
        else{
            messageBox("All blocks deleted!", "warning");
        }
        console.log(lastSelectedIndex); 
    });
}

function selectBlock(selectedBlockIndex){
    console.log(selectedBlockIndex)
    blockList.map(blockObject => blockObject.blockElement).forEach((block, index) => {
        block.classList.remove("selected");
        if(index === selectedBlockIndex)
        {
            block.classList.add("selected");
            if(!isDeleted) {
                blockList[lastSelectedIndex].cssCode = document.querySelector(".code-editor").innerText;
            }
            document.querySelector(".code-editor").innerText = blockList[selectedBlockIndex].cssCode;
            lastSelectedIndex = selectedBlockIndex;
            isDeleted = false;
        }
    })
    console.log(blockList);
}

editor.addEventListener("keyup", () => {
    let codeLine = editor.innerText;
    if (codeLine.includes(";"))
    {
        codeLine = codeLine.split(";");
        codeLine.forEach(code => {
            styleFeatureParser(code);
        });
    }
    else
        if(codeLine.includes(":"))
            styleFeatureParser(codeLine);

});

function styleFeatureParser(string) {
    string = string.replace(/\n/g, "").replace(/\s/g, "").split(":");
    document.querySelectorAll(".block").forEach((block, index) => {
        if (index === lastSelectedIndex){
            block.style[string[0]] = string[1];
        }
    });
}

function messageBox(message, messageType) {
    const messageTypeList = {
        "success": "message-box-success",
        "warning": "message-box-warning"
    }
    messageBoxBlock.innerText = message;
    messageBoxBlock.classList.add(messageTypeList[messageType]);
    setTimeout(() => {
        messageBoxBlock.classList.remove(messageTypeList[messageType]);
    }, 1000);
}

addBlockButton();
deleteBlockButton();