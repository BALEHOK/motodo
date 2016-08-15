import { connect } from 'react-redux';
import AddItem from './AddItem';
import * as ItemsActionCreators from '../../Actions/ItemsActionCreators';

const mapStateToProps = (state) => {
  return {
    defaultDate: state.app.date
  };
};

export default connect(mapStateToProps, ItemsActionCreators)(AddItem);
