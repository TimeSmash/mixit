const BACKEND_URL = "http://localhost:3005"

const showProps = (component) => {
    console.log(`${component.constructor.name} component props`, component.props)
  }

const capitalize = (word) =>{
  return word[0].toUpperCase()+word.slice(1)
}
  export { BACKEND_URL, showProps, capitalize }
// export default "no"