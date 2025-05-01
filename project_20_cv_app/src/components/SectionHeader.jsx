import '../../styles/SectionHeader.css'
import ShowHideButton from './ShowHideButton'

function SectionHeader({headerTitle = '', showForm, setShowForm}) {

    return (
        <div>
        <h2>{headerTitle}</h2>
        <ShowHideButton showForm={showForm} setShowForm={setShowForm}></ShowHideButton>
      </div>
    )
}

export default SectionHeader