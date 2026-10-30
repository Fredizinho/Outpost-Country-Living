import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Account page functionality has been merged into Settings (Data & Privacy tab),
 * combining profile demographics, Google auth, JSON backups, and local storage purge.
 */
export default function Account() {
  return <Navigate to="/settings?tab=data" replace />;
}
