/**
 *  The fields to be added to the form
 *  NOTE: Do not use body or subject for the name fields
 *  (those are reserved)
 */

module.exports = [

  {
    label: "______________________________________________\n\nIssue Information",
    name: 'heading',
    value: '______________________________________________',
    el_type: 'input',
    type: 'hidden',
    ignore: true
  },

  {
    label: 'Action Taken',
    name: 'action_taken',
    el_type: 'textarea',
    max_length: 144,
    placeholder: 'Describe the action you took before encountering the bug',
    required: true
  },

  {
    label: 'Result',
    name: 'result',
    el_type: 'textarea',
    max_length: 144,
    placeholder: 'Describe what happened.',
    required: true
  },

  {
    label: 'Expected Result',
    name: 'expected_result',
    el_type: 'textarea',
    max_length: 144,
    placeholder: 'Describe what should have happened.',
    required: true
  },

];
