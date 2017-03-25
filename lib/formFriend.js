var formFriend = {};

(function () {

  function render(elementId, form, qName, node, graph, result, whenDone) {
    form.innerHTML = '';

    if (node.message) {
      var label = document.createElement('label');
      label.className = 'form-friend-message';
      label.textContent = node.message;

      form.appendChild(label);
    }

    if (node.number) {
      var input = document.createElement('input');
      input.type = 'number';
      input.min = node.number.min;
      input.max = node.number.max;
      input.className = 'form-friend-number';

      form.appendChild(input);

      var buttonElem = document.createElement('button');
      buttonElem.className = 'form-friend-button form-friend-number-button';
      buttonElem.textContent = node.number.text || 'Next';

      buttonElem.onclick = function () {
        result[qName] = parseInt(input.value);

        if (node.number.goesTo === 'done') {
          graph.done && render(elementId, form, 'done', graph.done, graph, result, whenDone);
          whenDone(result);
        } else {
          render(elementId, form, node.number.goesTo, graph[node.number.goesTo], graph, result, whenDone);
        }
      };

      form.appendChild(buttonElem);
    }

    if (node.checkboxes) {
      var boxes = [];
      (node.checkboxes.values || []).forEach(function (box, i) {
        var chkbox = document.createElement('input');
        chkbox.type = 'checkbox';
        chkbox.className = 'form-friend-checkbox';
        var id = elementId + '-ff-chkbox-' + i;
        chkbox.id = id;
        chkbox.value = box.savesAs;
        var label = document.createElement('label');
        label.htmlFor = id;
        label.innerHTML = box.text;

        form.appendChild(chkbox);
        boxes.push(chkbox);
        form.appendChild(label);
      });

      var buttonElem = document.createElement('button');
      buttonElem.className = 'form-friend-button form-friend-checkbox-button';
      buttonElem.textContent = node.checkboxes.text || 'Next';

      buttonElem.onclick = function () {
        result[qName] = boxes
          .filter(function (box) { return box.checked; })
          .map(function (box) { return box.value; });

        if (node.checkboxes.goesTo === 'done') {
          graph.done && render(elementId, form, 'done', graph.done, graph, result, whenDone);
          whenDone(result);
        } else {
          render(elementId, form, node.checkboxes.goesTo, graph[node.checkboxes.goesTo], graph, result, whenDone);
        }
      };

      form.appendChild(buttonElem);
    }

    (node.buttons || []).forEach(function (button) {
      var buttonElem = document.createElement('button');
      buttonElem.className = 'form-friend-button';
      buttonElem.textContent = button.text;

      buttonElem.onclick = function () {
        if (button.savesAs) { result[qName] = button.savesAs };

        if (button.goesTo === 'done') {
          graph.done && render(elementId, form, 'done', graph.done, graph, result, whenDone);
          whenDone(result);
        } else {
          render(elementId, form, button.goesTo, graph[button.goesTo], graph, result, whenDone);
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

    render(elementId, form, 'friendAndEnter', formGraph.friendAndEnter, formGraph, {}, whenDone);
  };

})();
