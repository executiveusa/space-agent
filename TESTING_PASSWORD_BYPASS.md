# Temporary Password Bypass for Testing

This document explains how to temporarily disable password verification for testing purposes.

## Overview

The authentication system has been modified to support a temporary password bypass for testing. This allows you to log in with any username without providing a valid password.

**IMPORTANT**: This is **TEMPORARY FOR TESTING ONLY**. Never use this in production.

## How to Enable

Set the environment variable `SKIP_PASSWORD_VERIFICATION` to `true`:

```bash
export SKIP_PASSWORD_VERIFICATION=true
npm run dev
```

Or when starting with Node directly:

```bash
SKIP_PASSWORD_VERIFICATION=true node server.js
```

## How It Works

When enabled:

1. The login endpoint (`/api/login`) will skip the password verification step
2. Any username can be used to log in
3. The system will auto-generate a valid server signature required by the client
4. The user will be authenticated as normal
5. A console message will appear: `[v0] Password verification skipped for testing - user: [username]`

## Login Flow

Normal login (with password verification disabled):

```javascript
// In browser console or login form
const response = await fetch('/api/login_challenge', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    clientNonce: '[generated]',
    username: 'testuser'
  })
});

// Use ANY client proof (or generated empty one)
const loginResponse = await fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    challengeToken: '[from challenge]',
    clientProof: 'AAAA...' // Any valid base64url string
  })
});
```

## Testing Checklist

- [ ] Set `SKIP_PASSWORD_VERIFICATION=true` before starting
- [ ] Verify console shows password bypass message on login
- [ ] Test multiple usernames
- [ ] Verify session is created correctly
- [ ] Verify authentication persists across page reloads
- [ ] Test logout/revokeSession still works
- [ ] **Always disable before deploying**

## Important Notes

⚠️ **Security**: This completely bypasses authentication. Use ONLY in local development.

⚠️ **Client-side**: The client still expects a valid server signature. The server auto-generates one, but the crypto verification flow is still intact.

⚠️ **Session**: Sessions created during bypass mode are fully functional sessions. They can be revoked normally.

## Disabling

Simply unset or set to `false`:

```bash
unset SKIP_PASSWORD_VERIFICATION
npm run dev
```

Or set explicitly to `false`:

```bash
export SKIP_PASSWORD_VERIFICATION=false
npm run dev
```

## Code Location

The bypass logic is implemented in:
- **File**: `server/lib/auth/service.js`
- **Function**: `completeLogin()`
- **Lines**: 672-706

When `SKIP_PASSWORD_VERIFICATION=true`:
1. Password verification is skipped
2. A dummy server signature is generated using the verifier's server key
3. Login proceeds normally with auto-generated credentials

## Testing Agent Alex Features

You can use this bypass to quickly test Agent Alex features without password entry:

```bash
# Terminal 1: Start with bypass enabled
SKIP_PASSWORD_VERIFICATION=true npm run dev

# Terminal 2: Open app and login as any user
# Username: testuser (or any username)
# Password: (not required, can be empty)
# Result: Logged in and ready to test
```
