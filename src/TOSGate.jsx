/**
 * TOSGate.jsx
 * 
 * Drop this wrapper around your entire app in App.jsx (or your router root).
 * Any user who hasn't accepted the current TOS version will be shown the
 * TermsOfService page first — no matter which route they navigate to.
 *
 * Usage in App.jsx:
 * 
 *   import TOSGate from './TOSGate';
 *
 *   export default function App() {
 *     return (
 *       <TOSGate>
 *         <YourRouterAndPages />
 *       </TOSGate>
 *     );
 *   }
 */

import React, { useState } from 'react';
import TermsOfService from './TermsOfService';

// ── Configuration ─────────────────────────────────────────────────────────────
// Bump this string whenever you update the TOS and want all users to re-accept.
const REQUIRED_TOS_VERSION = '1.0.1';
const TOS_KEY = 'clc_tos_acceptance';
// ─────────────────────────────────────────────────────────────────────────────

function hasAcceptedCurrentTOS() {
  try {
    const stored = JSON.parse(localStorage.getItem(TOS_KEY) || 'null');
    return stored?.version === REQUIRED_TOS_VERSION;
  } catch {
    return false;
  }
}

export default function TOSGate({ children }) {
  // Use lazy initialization to read from localStorage once during mount.
  // This avoids the need for useEffect + setState which triggers cascading renders.
  const [accepted, setAccepted] = useState(() => hasAcceptedCurrentTOS());

  // If user hasn't accepted the current TOS version, show the TermsOfService page.
  // Lazy initialization runs synchronously during mount, so accepted is always true or false.
  // No loading spinner needed - this prevents any flash of content.
  if (!accepted) {
    return <TermsOfService onAccept={() => setAccepted(true)} />;
  }

  return <>{children}</>;
}
