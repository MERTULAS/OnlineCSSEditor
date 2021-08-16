const editor = document.querySelector(".code-editor");
const showPanel = document.querySelector(".blocks-show-screen");
const addBtn = document.querySelector(".add-block"); 
const deleteBtn = document.querySelector(".delete-block");
var blocks = document.querySelectorAll(".block");

var blocksSettings = [
    {
        cssCode: "" 
    }
];

var lastSelectedIndex = 0;
var lastAdded = 1;

showPanel.addEventListener("click", (e) => {
    if (e.target.classList.contains("block")) {
        let blocks = document.querySelectorAll(".block");
        blocks.forEach((block, index) => {
            block.addEventListener("click", () => {
                console.log(index);
                selectBlock(blocks, index);
            })
        });
    }
});

function addBlockButton() {
    addBtn.addEventListener("click", () => {
        let newBlock = document.createElement("div");
        newBlock.className = "block";
        newBlock.innerText = `Block ${lastAdded}`;
        lastAdded++;
        showPanel.append(newBlock);
        let blockObject = {
            cssCode: "" 
        };
        blocksSettings.push(blockObject);
    });
}

function deleteBlockButton() {
    deleteBtn.addEventListener("click", () => {
        let blocks = document.querySelectorAll(".block");
        showPanel.removeChild(blocks[lastSelectedIndex]);  
        blocksSettings.splice(lastSelectedIndex, 1);     
        console.log(blocksSettings); 
    });
}

function selectBlock(blocks, selectedBlockIndex){
    blocks.forEach((block, index) => {
        block.classList.remove("selected");
        if(index === selectedBlockIndex)
        {
            block.classList.add("selected");
            blocksSettings[lastSelectedIndex].cssCode = document.querySelector(".code-editor").value;
            document.querySelector(".code-editor").value = blocksSettings[selectedBlockIndex].cssCode;
            lastSelectedIndex = selectedBlockIndex;
        }
    });
    console.log(blocksSettings);
}


editor.addEventListener("keydown", () => {
    let codeLine = editor.value;
    if (codeLine.includes(";"))
        codeLine = codeLine.split(";");
    else
        codeLine = codeLine.split(":");

    //console.log(codeLine);
});

editor.addEventListener("keyup", () => {
    let codeLine = editor.value;
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

    //console.log(codeLine);
});

function styleFeatureParser(string) {
    string = string.replace("\n", "").split(":");
    document.querySelectorAll(".block").forEach((block, index) => {
        if (index === lastSelectedIndex)
            block.style[string[0]] = string[1];
    });
}

addBlockButton();
deleteBlockButton();