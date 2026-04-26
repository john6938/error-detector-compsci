// JavaScript Document
/*
v2 captured group for each regex using dollar sign
v3 added alphanumeric code to html
v4 added emotions to html
v5 to add hint onHover
v6 to add emoticons using i class
v7 to show output onKeyUp - real time
v8 to simplify this script by cutting out repetition
v9 added alphanumeric code to js
v10 added more errors
v11 added more errors
v12 passed emoticon in replace string
v13 moved feedback message to key (added array d)
v14-16 solved colour problems in output text and feedback box (Brevity colour)
v16a added shared vars within Brevity function*
v19 all var c added, emoticon issue in Accuracy with optional items
v20 pass emoticons and code through match and add pop-up advice for brevity
v21 add advice for all regex via pop-ups, solved most clashes added all feedback to span title
STILL problem with undefined abbreviations in Accuracy fn
LATER put multimedia hyperlinks and narrower codes, e.g. B1-1,.A5-1 in orange box for reference*/

let errorsObject = null;  // an object with processed errors obtained from BE via JSON

// Init a input and timeout variables to be used for input text processing
let input = null;
let timeout = null;
window.onload = function() {
    // Get the input box
    input = document.getElementById('sstextbox');

    // Listen for keystroke events
    input.addEventListener('keyup', function () {
        // Clear the timeout if it has already been set.
        // This will prevent the previous task from executing
        // if it has been less than <MILLISECONDS>
        clearTimeout(timeout);

        // Make a new timeout set to go off in 1000ms (1 second)
        timeout = setTimeout(function () {
            textChange()
        }, 1000);
    });
};
function textChange()
{
    $.ajax({
        url : "/home",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(input.value),
        type:"POST",
        success: function(data){
            errorsObject = data;
            clr();
            parseString(input.value, errorsObject);
        }
    });
}
function setButton(buttonId, stateBit) {
    if (stateBit === 1) $( buttonId ).addClass( "active" );
    else $( buttonId ).removeClass( "active" );
}
function changeToggleAccuracy() {
    AToggle = 1 - AToggle;
    parseString(input.value, errorsObject);
    setButton("#button1", AToggle);
}
function changeToggleBrevity() {
    BToggle = 1 - BToggle;
    parseString(input.value, errorsObject);
    setButton("#button2", BToggle);
}
function changeToggleClarity() {
    CToggle = 1 - CToggle;
    parseString(input.value, errorsObject);
    setButton("#button3", CToggle);
}
function changeToggleObjectivity() {
    OToggle = 1 - OToggle;
    parseString(input.value, errorsObject);
    setButton("#button4", OToggle);
}
function changeToggleFormality() {
    FToggle = 1 - FToggle;
    parseString(input.value, errorsObject);
    setButton("#button5", FToggle);
}
function parseString(text, errorData) {
    function extractErrorsAndPopUps(errorData) {
        // return a sorted array of error items (span, pop-up error ID, error class name, error sub-class name)
        // create all pop-ups corresponding to displayed errors

        function getErrorPopUp(errID, helpText, video) {
            let videoFrame = ``;
            if (video !== '') {
                videoFrame = `
<div class="video-container"><iframe type="text/html" src="https://www.youtube-nocookie.com/embed/${video}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
`;
            }
            return `
<div class="modal fade" id="err-${errID}" tabindex="-1" role="dialog" aria-labelledby="Error Information" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <p>${helpText}</p>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                ${videoFrame}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
`;
        }

        let errorPopups = '';  // an object with pop-up windows for errors in the text
        let spanAndIDs = [];
        // process all enabled errors in the text
        let errorCount = 0;
        for (const [errorClassName, errorClass] of Object.entries(errorData)) {
            if (
                AToggle !== 1 && errorClassName === "Accuracy Detector" ||
                BToggle !== 1 && errorClassName === "Brevity Detector" ||
                CToggle !== 1 && errorClassName === "Clarity Detector" ||
                OToggle !== 1 && errorClassName === "Objectivity Detector" ||
                FToggle !== 1 && errorClassName === "Formality Detector"
            ) {
                continue;
            }
            // collect errors with their error IDs and create their corresponding error pop-ups
            for (const [errorSubclassName, errorSubclass] of Object.entries(errorClass)) {
                for (let err of errorSubclass) {
                    let help = err.help;
                    let video = err.video;
                    errorPopups += getErrorPopUp(errorCount, help, video);
                    for (let span of err['spans']) {
                        spanAndIDs.push([span[0], span[1], errorCount, errorClassName, errorSubclassName]);
                    }
                    errorCount++;
                }
            }
        }
        document.getElementById("output-explanations").innerHTML = errorPopups;
        return spanAndIDs.sort(function(a, b){return a[0]-b[0]});
    }
    function highlightErrors(spanAndIDs, text) {
        // use extracted and sorted span information to highlight the errors within the text and display results

        // HTML text pieces for error explanation
        const stringReplace = {};
        stringReplace["Accuracy Detector"] = '<span style="background-color:#ffff66;"><b>Accuracy check:</span> </b><i class="em em-owl"></i><b>'; //some error here when regex contains options
        stringReplace["Brevity Detector"] = '<span style="background-color:#ffb366;"><b>Brevity check:</span> </b><i class="em em-busts_in_silhouette"></i><b>';
        stringReplace["Clarity Detector"] = '<span style="background-color:#c0e769;"><b>Clarity check:</span> </b><i class="em em-radio_button"></i><b>';
        stringReplace["Objectivity Detector"] = '<span style="background-color:#69e4e7;"><b>Objectivity check:</span> </b><i class="em em-grinning_face_with_one_large_and_one_small_eye"></i><b>';
        stringReplace["Formality Detector"] = '<span style="background-color:#B19CD9;"><b>Formality check:</span> </b><i class="em em-beer"></i><b>';
        // insert error notes with links to pop-ups into the original text
        let processedText = '';
        let caretPosition = 0;
        for (let span of spanAndIDs) {
            processedText += text.slice(caretPosition, span[0]);
            caretPosition = span[1];

            let errorText = text.slice(span[0], span[1]);
            const errNb = span[2];
            const errorClassName = span[3];
            const errorSubclassName = span[4];

            errorText = '<a style="color: inherit;text-decoration: inherit;" href="#err-' + errNb + '" data-toggle="modal">' + stringReplace[errorClassName] + errorSubclassName + ' <i style="color:red;">' + errorText + '</i></b></a>';
            processedText += errorText;
        }
        processedText += text.slice(caretPosition);

        document.getElementById("output").innerHTML = processedText;
        document.getElementById("introduction").innerHTML = "<h3 style=\"text-align: left\">Automated feedback</h3><p style=\"text-align: left\"> The potential errors are highlighted according to the following colour scheme: <i>&nbsp;<span style=\"background-color:#ffff66;\"> Accuracy errors </span>&nbsp;<span style=\"background-color:#ffb366;\"> Brevity errors </span> &nbsp;<span style=\"background-color:#c0e769;\"> Clarity errors </span> &nbsp;<span style=\"background-color:#69e4e7;\"> Objectivity errors </span>&nbsp;<span style=\"background-color:#B19CD9;\"> Formality errors</span></i>. Advice will appear when cursor is placed over error. </p></body>";
    }
    if (errorData !== null) {
        const spanAndIDs = extractErrorsAndPopUps(errorData);
        highlightErrors(spanAndIDs, text);
    }
}
function clr(){
    document.getElementById("output").innerHTML = "";
    document.getElementById("output1").innerHTML = "";
    document.getElementById("output2").innerHTML = "";
    document.getElementById("output3").innerHTML = "";
    document.getElementById("output-explanations").innerHTML = "";
    document.getElementById("introduction").innerHTML = "";
    alreadyDA=0;
    alreadyDB=0;
    alreadyDC=0;
    alreadyDO=0;
    alreadyDF=0;
    progress=0;
}
let AToggle=1;
let BToggle=1;
let CToggle=1;
let OToggle=1;
let FToggle=1;
let alreadyDA = 0;
let alreadyDB = 0;
let alreadyDC = 0;
let alreadyDO = 0;
let alreadyDF = 0;
let progress = 0;

function mouseout(){
    document.getElementById("intro").innerText="Explanations of the buttons appear here.";
}
function mouseover1(){
    document.getElementById("intro").innerText = "Checks for common grammar, vocabulary, spelling and other errors";
}
function mouseover2(){
    document.getElementById("intro").innerText ="Checks for repetition and redundancy";
}
function mouseover3(){
    document.getElementById("intro").innerText = "Checks for vagueness and ambiguity";
}
function mouseover4(){
    document.getElementById("intro").innerText = "Checks for excessive personalization, focus on feelings and emotive words";
}
function mouseover5(){
    document.getElementById("intro").innerText = "Checks for informal language and inappropriate style";
}