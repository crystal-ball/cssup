import cssup from 'cssup'

const regularVariable = 'test'

const staticTest = cssup`
.test {
  color: 'blue';
  line-height: 14px;

  &.nested { background: 'transparent'; }
}`

const testIgnoreTemplateExpression = cssip`this template string should remain untouched`

const dynamicTest = ({ color, outline, size }) => cssup`
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;

  ${{ outline }}
  ${{ 'test-string-key': size && color }}
  ${{ [`test-template-key-${size}`]: size && !col }}
  &.outline {
    color: #374d68;
    background-color: transparent;
    background-image: none;
    border-color: #374d68;
  }
}`
