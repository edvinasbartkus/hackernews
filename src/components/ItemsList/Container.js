import ItemsList from './Component';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    items: state.items || [],
    isLoading: state.isLoading || false
  };
};

export default connect(mapStateToProps)(ItemsList);
