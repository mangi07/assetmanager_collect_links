function setDebugMsg(msg) {
  document.querySelector('#debug').innerText = msg;
}


function setMessage(msg) {
  document.querySelector('#msg').innerText = msg;
}

function getLink(element){
  var href = child.firstElementChild.getAttribute("href");
  if (href !== null) {
    return href;
  } else {
    var a = child.getElementsByClassName("UXHyperLink");
    return a[0].innerText;
  }
}
    
function getUrls() {
  // get attachments
  var attachments = [];
  var table = document.getElementById("ctl14_uxGVFileAttachment_lwResults_table_result");
  var rows = table.getElementsByClassName("row");
  var altrows = table.getElementsByClassName("altrow");
  
  
  
  for (var i = 0; i < rows.length; ++i) {
    var child = rows[i].children[1];
    attachments.push(getLink(child));
  }
  
  for (i = 0; i < altrows.length; ++i) {
    child = altrows[i].children[1];
    attachments.push(getLink(child));
  }
  
  
  var attstr = "{"
  for (i = 0; i < attachments.length; ++i) {
    attstr = attstr.concat(attachments[i])
    if (i+1 < attachments.length) {
      attstr = attstr.concat(", ")
    }
  }
  attstr = attstr.concat("}")
  
  console.log(attstr);
  return attstr;
}

/* from https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard */
function updateClipboard(newClip) {
  navigator.clipboard.writeText(newClip).then(function() {
    /* clipboard successfully set */
    setMessage("Copied to clipboard: " + newClip);
    console.log("From Attachment Scraper extension: " + urls);
  }, function() {
    /* clipboard write failed */
    setMessage("Could not copy the following to the clipboard: " + newClip);
  });
}

function copyUrls() {
  try {
    var urls;
    chrome.tabs.executeScript({
        code: '(' + getUrls + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
        console.log('Popup script:')
        console.log(results[0]);
        urls = results[0];
    });
    //var urls = getUrls();
    updateClipboard(url);
  } catch (error) {
    setMessage("Could not find the urls.")
  }
}




document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', copyUrls);
});