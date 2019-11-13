const BACKEND_URL = "http://localhost:3005"

const showProps = (component) => {
    console.log(`${component.constructor.name} component props`, component.props)
  }

  export { BACKEND_URL, showProps }
// export default "no"