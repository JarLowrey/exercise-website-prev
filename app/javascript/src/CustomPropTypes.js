import PropTypes from 'prop-types';

export const AddressPropType = PropTypes.shape({
  street_address: PropTypes.string.isRequired,
  latitude: PropTypes.string.isRequired,
  longitude: PropTypes.string.isRequired,
});

export const EventPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  description: PropTypes.string,
  address: AddressPropType,
});
