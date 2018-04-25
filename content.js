const regularVariable = 'test'

const testStyles = cssup`
.test {
  color: 'blue';
  line-height: 14px;

  &.nested { background: 'transparent'; }
}`

const skipTemplateString = trick`don't interact`

const testDynamicStyles = ({ size, col }) => cssup`
.test {
  pointer-events: none;
  border-radius: 0.25em;

  ${{ size }}
  ${{ 'test-col': size && col }}
  ${{ [`btn-${size}`]: size && !col }}
  &.large { font-size: 32px; }
  &.small { font-size: 10px; }
}`
