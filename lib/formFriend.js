var formFriend = {};

(function () {

  function render(form, qName, node, graph, result, whenDone) {
    form.innerHTML = '';

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

      buttonElem.onclick = function () {
        if (button.savesAs) { result[qName] = button.savesAs };

        if (button.goesTo === 'done') {
          graph.done && render(form, 'done', graph.done, graph, result, whenDone);
          whenDone(result);
        } else {
          render(form, button.goesTo, graph[button.goesTo], graph, result, whenDone);
        }
      };

      form.appendChild(buttonElem);
    });
  }

  formFriend.attach = function (elementId, formGraph, whenDone) {
    var root = document.getElementById(elementId);
    var form = document.createElement('div');
    form.className = 'form-friend-form';
    root.appendChild(form);

    render(form, 'friendAndEnter', formGraph.friendAndEnter, formGraph, {}, whenDone);
  };

})();
