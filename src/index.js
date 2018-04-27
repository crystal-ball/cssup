import cssup from '../browser'

const regularVariable = 'test'

const testStyles = cssup`
.test {
  color: 'blue';
  line-height: 14px;

  &.nested { background: 'transparent'; }
}`

const skipTemplateString = trick`don't interact`

const btnStyles = ({ color, outline, size }) => cssup`
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  border-radius: 0.25rem;

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

export default btnStyles
