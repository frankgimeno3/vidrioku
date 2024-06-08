import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import useUserSession from '../components/hooks/userSession';
import { selectUser } from '@/redux/features/userSlice';

function empresas() {
  const { userData, session } = useUserSession();
  const user = useSelector(selectUser);
  return (
    <div>empresas</div>
  )
}

empresas.propTypes = {}

export default empresas
