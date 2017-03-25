# form-friend

A VanillaJS library for making simple, Q&A style forms.

## Using `form-friend`
Once `formFriend` has been required, call attach to start the Q&A
```javascript
formFriend.attach(<element-id>, <graph>, <results-callback>);
```
where
 - `<element-id>` is an HTML id that specifies the to-be form's container
 - `<graph>` is an object describing the questionnaire
 - `<results-callback>` is a function accepting the questionnaire results as its first argument

### Questionnaire Graph
The questionnaire graph is an object whose basic form is
```javascript
{
  ...,
  someStateName: someDefinition
  ...
}
```
where
 - `someStateName` is a unique name, describing a question
 - `someDefinition` is an object specifying metadata about the question

The `friendAndEnter` and `done` state names are required and represent the beginning and end of the form, respectively.

`done` must be an object with a `message` key (e.g. `{ "message": "Thanks!" }`) but `friendAndEnter` can be any valid definition

## Examples
See [test.html](./test/test.html) for a working example.
