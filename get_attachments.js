function setDebugMsg(msg) {
  document.querySelector('#debug').innerText = msg;
}


function setMessage(msg) {
  document.querySelector('#msg').innerText = msg;
}

  
function getLink(element){
  var href = element.firstElementChild.getAttribute("href");
  if (href !== null) {
    return href;
  } else {
    var a = element.getElementsByClassName("UXHyperLink");
    return a[0].innerText;
  }
}


function getUrls(getLink) {
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
  }, function() {
    /* clipboard write failed */
    setMessage("Could not copy the following to the clipboard: " + newClip);
  });
}


function copyUrls() {
  try {
    var urls;
    chrome.tabs.executeScript({
        code: 'urls = ('+ getUrls +')(' + getLink + ')',
    }, updateClipboard);
    setMessage("got here");
  } catch (error) {
    setMessage("Could not find the urls.");
  }
}


document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', copyUrls);
});