var formFriend = {};

(function () {

  function render(form, elementId, node, result) {
    if (node.message) {
      var label = document.createElement('label');
      label.className = 'form-friend-message';
      label.textContent = node.message;

      form.appendChild(label);
    }

    (node.buttons || []).forEach(function (button) {
      var buttonElem = document.createElement('button');
      buttonElem.className = 'form-friend-button';
      buttonElem.textContent = button.text;

      form.appendChild(buttonElem);
    });
  }

  formFriend.attach = function (elementId, formGraph, whenDone) {
    var root = document.getElementById(elementId);
    var form = document.createElement('div');
    form.className = 'form-friend-form';
    root.appendChild(form);

    render(form, elementId, formGraph.friendAndEnter, {});
  };

})();

