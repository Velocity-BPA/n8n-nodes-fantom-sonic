# n8n-nodes-fantom-sonic

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

An n8n community node for interacting with the Fantom/Sonic blockchain network. This node provides comprehensive access to 6 core blockchain resources including account management, transaction processing, block data retrieval, smart contract interactions, network information, and staking operations for building powerful DeFi and blockchain automation workflows.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Fantom](https://img.shields.io/badge/Fantom-Sonic-orange)
![DeFi](https://img.shields.io/badge/DeFi-Ready-green)
![Web3](https://img.shields.io/badge/Web3-Compatible-purple)

## Features

- **Account Management** - Query balances, transaction history, and account details across Fantom/Sonic network
- **Transaction Processing** - Send transactions, query transaction status, and retrieve detailed transaction data
- **Block Data Access** - Fetch block information, block headers, and historical blockchain data
- **Smart Contract Interaction** - Deploy, call, and monitor smart contracts with full ABI support
- **Network Monitoring** - Access real-time network statistics, validator information, and consensus data
- **Staking Operations** - Manage staking rewards, delegation, and validator interactions
- **Real-time Updates** - Subscribe to blockchain events and transaction confirmations
- **Error Handling** - Comprehensive error management with retry logic and detailed error messages

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-fantom-sonic`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-fantom-sonic
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-fantom-sonic.git
cd n8n-nodes-fantom-sonic
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-fantom-sonic
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your Fantom/Sonic API key for authentication | Yes |
| RPC URL | Custom RPC endpoint URL (optional, uses default if empty) | No |
| Network | Network environment (mainnet, testnet) | Yes |

## Resources & Operations

### 1. Account

| Operation | Description |
|-----------|-------------|
| Get Balance | Retrieve FTM balance for a specific account address |
| Get Transaction History | Fetch transaction history for an account |
| Get Account Info | Get detailed account information including nonce and code |
| Get Token Balances | Retrieve ERC-20 token balances for an account |

### 2. Transaction

| Operation | Description |
|-----------|-------------|
| Send Transaction | Send a new transaction to the network |
| Get Transaction | Retrieve transaction details by hash |
| Get Transaction Receipt | Get transaction receipt and execution status |
| Estimate Gas | Estimate gas cost for a transaction |
| Get Pending Transactions | Fetch pending transactions in mempool |

### 3. Block

| Operation | Description |
|-----------|-------------|
| Get Block | Retrieve block information by number or hash |
| Get Latest Block | Fetch the most recent block |
| Get Block Transactions | Get all transactions within a specific block |
| Get Block Range | Retrieve multiple blocks within a specified range |

### 4. Smart Contract

| Operation | Description |
|-----------|-------------|
| Call Function | Execute a read-only smart contract function |
| Send Transaction | Execute a state-changing smart contract function |
| Deploy Contract | Deploy a new smart contract to the network |
| Get Contract Info | Retrieve contract metadata and ABI information |
| Get Events | Fetch contract event logs |

### 5. Network

| Operation | Description |
|-----------|-------------|
| Get Network Info | Retrieve general network statistics |
| Get Validator List | Fetch list of active validators |
| Get Chain ID | Get the current chain identifier |
| Get Gas Price | Retrieve current gas price recommendations |
| Get Peer Count | Get number of connected peers |

### 6. Staking

| Operation | Description |
|-----------|-------------|
| Get Staking Info | Retrieve staking information for an address |
| Delegate Stake | Delegate FTM to a validator |
| Undelegate Stake | Remove delegation from a validator |
| Claim Rewards | Claim staking rewards |
| Get Validator Info | Get detailed validator information |

## Usage Examples

```javascript
// Get account balance
{
  "resource": "account",
  "operation": "getBalance",
  "address": "0x742d35cc6630c0532c274b92f5e5e7c13f924c7e"
}
```

```javascript
// Send a transaction
{
  "resource": "transaction",
  "operation": "sendTransaction",
  "to": "0x742d35cc6630c0532c274b92f5e5e7c13f924c7e",
  "value": "1000000000000000000",
  "gasLimit": "21000"
}
```

```javascript
// Call smart contract function
{
  "resource": "smartContract",
  "operation": "callFunction",
  "contractAddress": "0xa0b86a33e6dd4a81e5a85b7b6b4e3b4b0a9c3c4d",
  "functionName": "balanceOf",
  "parameters": ["0x742d35cc6630c0532c274b92f5e5e7c13f924c7e"]
}
```

```javascript
// Get latest block information
{
  "resource": "block",
  "operation": "getLatestBlock",
  "includeTransactions": true
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| Invalid API Key | Authentication failed with provided API key | Verify API key is correct and has proper permissions |
| Insufficient Funds | Account lacks sufficient balance for transaction | Check account balance and reduce transaction amount |
| Gas Limit Exceeded | Transaction requires more gas than specified | Increase gas limit or optimize contract call |
| Network Timeout | Request timed out waiting for network response | Retry request or check network connectivity |
| Invalid Address | Provided address format is incorrect | Verify address follows Fantom address format (0x...) |
| Contract Not Found | Smart contract does not exist at specified address | Verify contract address and deployment status |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-fantom-sonic/issues)
- **Fantom Documentation**: [Fantom Developer Docs](https://docs.fantom.foundation/)
- **Sonic Network**: [Sonic Labs Documentation](https://docs.sonic.foundation/)