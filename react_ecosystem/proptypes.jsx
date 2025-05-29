import PropTypes from "prop-types";

const RenderName = (porps) => {
    return <div>{porps.name}</div>
};

RenderName.propTypes = {
    name: PropTypes.string.isRequired,
};

RenderName.defaultProps = {
    name: 'Zach',
}

export default RenderName;