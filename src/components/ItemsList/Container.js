import ItemsList from './Component';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const items = state.items || [];
  return {
    items: [].concat(items).sort((a,b) => b.time - a.time),
    isLoading: state.isLoading || false
  };
};

export default connect(mapStateToProps)(ItemsList);
