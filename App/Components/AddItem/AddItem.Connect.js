import { connect } from 'react-redux';
import AddItem from './AddItem';
import * as ItemsActionCreators from '../../Actions/ItemsActionCreators';

const mapStateToProps = (state) => {
  return {
    defaultDate: new Date()
  };
};

export default connect(mapStateToProps, ItemsActionCreators)(AddItem);
