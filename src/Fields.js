import { Component, createElement } from 'react'
import PropTypes from 'prop-types';
import invariant from 'invariant'
import createConnectedFields from './ConnectedFields'
import shallowCompare from './util/shallowCompare'
import plain from './structure/plain'

const validateNameProp = prop => {
  if (!prop) {
    return new Error('No "names" prop was specified <Fields/>')
  }
  if (!Array.isArray(prop) && !prop._isFieldArray) {
    return new Error('Invalid prop "names" supplied to <Fields/>. Must be either an array of strings or the fields array generated by FieldArray.')
  }
}

const createFields = ({ deepEqual, getIn }) => {

  class Fields extends Component {
    constructor(props, context) {
      super(props, context)
      if (!context._reduxForm) {
        throw new Error('Fields must be inside a component decorated with reduxForm()')
      }
      this.ConnectedFields = createConnectedFields(context._reduxForm, {
        deepEqual,
        getIn
      }, this.names)
    }

    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState)
    }

    componentWillMount() {
      const error = validateNameProp(this.props.names)
      if(error) {
        throw error
      }
      const { _reduxForm: { register } } = this.context
      this.names.forEach(name => register(name, 'Field'))
    }

    componentWillReceiveProps(nextProps) {
      if (!plain.deepEqual(this.props.names, nextProps.names)) {
        // names changed, regenerate connected field
        this.ConnectedFields =
          createConnectedFields(this.context._reduxForm, { deepEqual, getIn }, nextProps.names)
      }
    }

    componentWillUnmount() {
      this.names.forEach(this.context._reduxForm.unregister)
    }

    getRenderedComponent() {
      invariant(this.props.withRef,
        'If you want to access getRenderedComponent(), ' +
        'you must specify a withRef prop to Fields')
      return this.refs.connected.getWrappedInstance().getRenderedComponent()
    }

    get names() {
      return this.props.names
    }

    get dirty() {
      return this.refs.connected.getWrappedInstance().isDirty()
    }

    get pristine() {
      return !this.dirty
    }

    get values() {
      return this.refs.connected && this.refs.connected.getWrappedInstance().getValues()
    }

    render() {
      return createElement(this.ConnectedFields, {
        ...this.props,
        ref: 'connected'
      })
    }
  }

  Fields.propTypes = {
    names: (props, propName) => validateNameProp(props[ propName ]),
    component: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]).isRequired,
    format: PropTypes.func,
    parse: PropTypes.func,
    props: PropTypes.object
  }
  Fields.contextTypes = {
    _reduxForm: PropTypes.object
  }

  return Fields
}

export default createFields
