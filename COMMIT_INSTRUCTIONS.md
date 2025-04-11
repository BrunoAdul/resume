# GitHub Repository Security Protocol

This document outlines the security protocols for maintaining this codebase in a public GitHub repository while protecting sensitive credentials and configuration data.

## Sensitive Asset Protection

The following files contain confidential information and are configured for exclusion from version control:

| File | Contents | Protection Status |
|------|----------|------------------|
| `api-config.json` | Hugging Face API credentials | Excluded via .gitignore |
| `form-config.json` | Google Form identifiers | Excluded via .gitignore |
| `cloudflare-worker-with-keys.js` | Consolidated credential file | Excluded via .gitignore |

## Secure Commit Workflow

Follow this protocol for all code submissions to maintain repository security:

### Pre-Commit Verification

```bash
# Verify no sensitive files are staged
git status
```

Confirm that none of the files listed in the table above appear in the "Changes to be committed" section of the output.

### Standard Commit Process

```bash
# Stage permitted files
git add .

# Create commit with descriptive message
git commit -m "feat: Add responsive design improvements to contact form"

# Push to remote repository
git push origin main
```

## Credential Exposure Remediation

If sensitive information has been inadvertently committed, execute this remediation protocol immediately:

```bash
# Remove sensitive files from Git tracking while preserving local copies
git rm --cached api-config.json form-config.json cloudflare-worker-with-keys.js

# Commit the tracking removal
git commit -m "security: Remove sensitive files from version control"

# Force push to replace repository history
git push origin main --force
```

**Additional Actions Required:**
1. Rotate all exposed credentials immediately
2. Review GitHub security alerts and respond accordingly
3. Document the incident and mitigation steps taken

## Deployment Security Checklist

Prior to production deployment:

- [ ] Replace template credential placeholders with actual values
- [ ] Configure Cloudflare Worker according to `SECURITY.md` specifications
- [ ] Implement all security headers and access controls
- [ ] Conduct thorough penetration testing
- [ ] Verify all sensitive data is properly isolated

## Security Best Practices

| Category | Guideline |
|----------|-----------|
| Credentials | Never commit API keys, tokens or passwords |
| Configuration | Store sensitive configuration in environment variables |
| Form IDs | Treat form identifiers as sensitive information |
| Proxy Implementation | Use the secure proxy architecture in `SECURITY.md` |
| Code Reviews | Require security review for all credential-adjacent code |

## Compliance Requirements

All contributors must adhere to these security protocols. Any deviation compromises the integrity of the application and potentially exposes sensitive user data.

For questions regarding these protocols, consult the security documentation or contact the repository administrator.