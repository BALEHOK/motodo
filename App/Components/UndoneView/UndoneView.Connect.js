import { connect } from 'react-redux';
import UndoneView from './UndoneView';

const mapStateToProps = (state) => {
  return {
    items: state.dayView.items
  };
};

export default connect(mapStateToProps)(UndoneView);
