/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-fantomsonic/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class FantomSonic implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Fantom/Sonic',
    name: 'fantomsonic',
    icon: 'file:fantomsonic.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Fantom/Sonic API',
    defaults: {
      name: 'Fantom/Sonic',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'fantomsonicApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Account',
            value: 'account',
          },
          {
            name: 'Transaction',
            value: 'transaction',
          },
          {
            name: 'Block',
            value: 'block',
          },
          {
            name: 'Smart Contract',
            value: 'smartContract',
          },
          {
            name: 'Network',
            value: 'network',
          },
          {
            name: 'Staking',
            value: 'staking',
          }
        ],
        default: 'account',
      },
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['account'] } },
  options: [
    { name: 'Get Balance', value: 'getBalance', description: 'Get account FTM balance', action: 'Get account balance' },
    { name: 'Get Transaction Count', value: 'getTransactionCount', description: 'Get account nonce/transaction count', action: 'Get transaction count' },
    { name: 'Get Code', value: 'getCode', description: 'Get smart contract bytecode at address', action: 'Get contract code' },
    { name: 'Get Storage At', value: 'getStorageAt', description: 'Get storage value at specific position', action: 'Get storage value' },
  ],
  default: 'getBalance',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['transaction'],
		},
	},
	options: [
		{
			name: 'Send Raw Transaction',
			value: 'sendRawTransaction',
			description: 'Send signed transaction to network',
			action: 'Send raw transaction',
		},
		{
			name: 'Get Transaction',
			value: 'getTransaction',
			description: 'Get transaction details by hash',
			action: 'Get transaction',
		},
		{
			name: 'Get Transaction Receipt',
			value: 'getTransactionReceipt',
			description: 'Get transaction receipt and status',
			action: 'Get transaction receipt',
		},
		{
			name: 'Estimate Gas',
			value: 'estimateGas',
			description: 'Estimate gas needed for transaction',
			action: 'Estimate gas',
		},
		{
			name: 'Get Transaction by Block Hash and Index',
			value: 'getTransactionByBlockHashAndIndex',
			description: 'Get transaction by block hash and index',
			action: 'Get transaction by block hash and index',
		},
		{
			name: 'Get Transaction by Block Number and Index',
			value: 'getTransactionByBlockNumberAndIndex',
			description: 'Get transaction by block number and index',
			action: 'Get transaction by block number and index',
		},
	],
	default: 'sendRawTransaction',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['block'] } },
  options: [
    { name: 'Get Latest Block Number', value: 'getBlockNumber', description: 'Get the latest block number', action: 'Get latest block number' },
    { name: 'Get Block by Hash', value: 'getBlockByHash', description: 'Get block details by hash', action: 'Get block by hash' },
    { name: 'Get Block by Number', value: 'getBlockByNumber', description: 'Get block details by number', action: 'Get block by number' },
    { name: 'Get Block Transaction Count by Hash', value: 'getBlockTransactionCountByHash', description: 'Get transaction count in block by hash', action: 'Get transaction count by hash' },
    { name: 'Get Block Transaction Count by Number', value: 'getBlockTransactionCountByNumber', description: 'Get transaction count in block by number', action: 'Get transaction count by number' }
  ],
  default: 'getBlockNumber',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['smartContract'] } },
  options: [
    { name: 'Call Function', value: 'call', description: 'Execute read-only smart contract function', action: 'Call smart contract function' },
    { name: 'Estimate Gas', value: 'estimateGas', description: 'Estimate gas for contract interaction', action: 'Estimate gas for contract interaction' },
    { name: 'Get Code', value: 'getCode', description: 'Get contract bytecode', action: 'Get contract bytecode' },
    { name: 'Get Logs', value: 'getLogs', description: 'Get contract event logs', action: 'Get contract event logs' }
  ],
  default: 'call',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['network'] } },
  options: [
    { name: 'Get Chain ID', value: 'getChainId', description: 'Get chain ID of the network', action: 'Get chain ID' },
    { name: 'Get Gas Price', value: 'getGasPrice', description: 'Get current gas price', action: 'Get gas price' },
    { name: 'Get Recommended Gas Price', value: 'getRecommendedGasPrice', description: 'Get recommended gas price', action: 'Get recommended gas price' },
    { name: 'Get Sync Status', value: 'getSyncStatus', description: 'Get node synchronization status', action: 'Get sync status' },
    { name: 'Get Network Version', value: 'getNetworkVersion', description: 'Get network version', action: 'Get network version' }
  ],
  default: 'getChainId',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['staking'],
    },
  },
  options: [
    {
      name: 'Get Validators',
      value: 'getValidators',
      description: 'Get list of validators',
      action: 'Get validators',
    },
    {
      name: 'Get Validator',
      value: 'getValidator',
      description: 'Get specific validator information',
      action: 'Get validator',
    },
    {
      name: 'Get Delegation',
      value: 'getDelegation',
      description: 'Get delegation information',
      action: 'Get delegation',
    },
    {
      name: 'Get Staking Rewards',
      value: 'getStakingRewards',
      description: 'Get staking rewards for delegator',
      action: 'Get staking rewards',
    },
  ],
  default: 'getValidators',
},
{
  displayName: 'Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['account'],
      operation: ['getBalance', 'getTransactionCount', 'getCode', 'getStorageAt'],
    },
  },
  default: '',
  placeholder: '0x742d35Cc6634C0532925a3b8D40E1F3E8b2C64E5',
  description: 'The address to query',
},
{
  displayName: 'Block Number',
  name: 'blockNumber',
  type: 'options',
  displayOptions: {
    show: {
      resource: ['account'],
      operation: ['getBalance', 'getTransactionCount', 'getCode', 'getStorageAt'],
    },
  },
  options: [
    { name: 'Latest', value: 'latest' },
    { name: 'Earliest', value: 'earliest' },
    { name: 'Pending', value: 'pending' },
    { name: 'Custom', value: 'custom' },
  ],
  default: 'latest',
  description: 'The block number to query',
},
{
  displayName: 'Custom Block Number',
  name: 'customBlockNumber',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['account'],
      operation: ['getBalance', 'getTransactionCount', 'getCode', 'getStorageAt'],
      blockNumber: ['custom'],
    },
  },
  default: '',
  placeholder: '0x1b4',
  description: 'Custom block number in hex format',
},
{
  displayName: 'Storage Position',
  name: 'position',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['account'],
      operation: ['getStorageAt'],
    },
  },
  default: '',
  placeholder: '0x0',
  description: 'The storage position in hex format',
},
{
	displayName: 'Signed Transaction Data',
	name: 'signedTransactionData',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['transaction'],
			operation: ['sendRawTransaction'],
		},
	},
	default: '',
	description: 'The signed transaction data in hexadecimal format',
},
{
	displayName: 'Transaction Hash',
	name: 'transactionHash',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['transaction'],
			operation: ['getTransaction', 'getTransactionReceipt'],
		},
	},
	default: '',
	description: 'The hash of the transaction to retrieve',
},
{
	displayName: 'Transaction',
	name: 'transaction',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['transaction'],
			operation: ['estimateGas'],
		},
	},
	default: '{}',
	description: 'Transaction object to estimate gas for',
},
{
	displayName: 'Block Hash',
	name: 'blockHash',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['transaction'],
			operation: ['getTransactionByBlockHashAndIndex'],
		},
	},
	default: '',
	description: 'The hash of the block containing the transaction',
},
{
	displayName: 'Block Number',
	name: 'blockNumber',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['transaction'],
			operation: ['getTransactionByBlockNumberAndIndex'],
		},
	},
	default: 'latest',
	description: 'The block number containing the transaction (hex string or "latest")',
},
{
	displayName: 'Transaction Index',
	name: 'index',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['transaction'],
			operation: ['getTransactionByBlockHashAndIndex', 'getTransactionByBlockNumberAndIndex'],
		},
	},
	default: '0x0',
	description: 'The index position of the transaction in the block (hex string)',
},
{
  displayName: 'Block Hash',
  name: 'blockHash',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['block'], operation: ['getBlockByHash', 'getBlockTransactionCountByHash'] } },
  default: '',
  description: 'The hash of the block',
},
{
  displayName: 'Block Number',
  name: 'blockNumber',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['block'], operation: ['getBlockByNumber', 'getBlockTransactionCountByNumber'] } },
  default: 'latest',
  description: 'The block number (hex string, integer, or "latest", "earliest", "pending")',
},
{
  displayName: 'Include Transactions',
  name: 'includeTransactions',
  type: 'boolean',
  displayOptions: { show: { resource: ['block'], operation: ['getBlockByHash', 'getBlockByNumber'] } },
  default: false,
  description: 'Whether to return full transaction objects (true) or just transaction hashes (false)',
},
{
  displayName: 'Transaction Object',
  name: 'transaction',
  type: 'json',
  displayOptions: { show: { resource: ['smartContract'], operation: ['call', 'estimateGas'] } },
  default: '{}',
  description: 'Transaction object containing to, data, from, gas, gasPrice, and value fields',
  placeholder: '{"to": "0x...", "data": "0x...", "from": "0x..."}',
  required: true,
},
{
  displayName: 'Block Number',
  name: 'blockNumber',
  type: 'string',
  displayOptions: { show: { resource: ['smartContract'], operation: ['call', 'getCode'] } },
  default: 'latest',
  description: 'Block number to query (hex string, "latest", "earliest", or "pending")',
  placeholder: 'latest',
},
{
  displayName: 'Contract Address',
  name: 'contractAddress',
  type: 'string',
  displayOptions: { show: { resource: ['smartContract'], operation: ['getCode'] } },
  default: '',
  description: 'The contract address to get bytecode for',
  placeholder: '0x...',
  required: true,
},
{
  displayName: 'Filter Object',
  name: 'filterObject',
  type: 'json',
  displayOptions: { show: { resource: ['smartContract'], operation: ['getLogs'] } },
  default: '{}',
  description: 'Filter object with fromBlock, toBlock, address, topics, and blockhash fields',
  placeholder: '{"address": "0x...", "fromBlock": "0x1", "toBlock": "latest"}',
  required: true,
},
{
  displayName: 'Network',
  name: 'networkType',
  type: 'options',
  required: true,
  displayOptions: {
    show: {
      resource: ['network'],
      operation: ['getChainId', 'getGasPrice', 'getRecommendedGasPrice', 'getSyncStatus', 'getNetworkVersion']
    }
  },
  options: [
    { name: 'Mainnet', value: 'mainnet', description: 'Sonic mainnet' },
    { name: 'Testnet', value: 'testnet', description: 'Sonic testnet' }
  ],
  default: 'mainnet',
  description: 'Choose between Sonic mainnet or testnet'
},
{
  displayName: 'Block Number',
  name: 'blockNumber',
  type: 'string',
  default: 'latest',
  description: 'Block number to query (latest, earliest, pending, or hex number)',
  displayOptions: {
    show: {
      resource: ['staking'],
      operation: ['getValidators', 'getValidator', 'getStakingRewards'],
    },
  },
},
{
  displayName: 'Validator Address',
  name: 'validatorAddress',
  type: 'string',
  required: true,
  default: '',
  description: 'Address of the validator',
  displayOptions: {
    show: {
      resource: ['staking'],
      operation: ['getValidator', 'getDelegation'],
    },
  },
},
{
  displayName: 'Delegator Address',
  name: 'delegatorAddress',
  type: 'string',
  required: true,
  default: '',
  description: 'Address of the delegator',
  displayOptions: {
    show: {
      resource: ['staking'],
      operation: ['getDelegation', 'getStakingRewards'],
    },
  },
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'account':
        return [await executeAccountOperations.call(this, items)];
      case 'transaction':
        return [await executeTransactionOperations.call(this, items)];
      case 'block':
        return [await executeBlockOperations.call(this, items)];
      case 'smartContract':
        return [await executeSmartContractOperations.call(this, items)];
      case 'network':
        return [await executeNetworkOperations.call(this, items)];
      case 'staking':
        return [await executeStakingOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeAccountOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('fantomsonicApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const address = this.getNodeParameter('address', i) as string;
      const blockNumber = this.getNodeParameter('blockNumber', i) as string;
      const customBlockNumber = this.getNodeParameter('customBlockNumber', i, '') as string;
      
      const blockParam = blockNumber === 'custom' ? customBlockNumber : blockNumber;

      const baseOptions: any = {
        method: 'POST',
        url: credentials.baseUrl,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${credentials.apiKey}`,
        },
        json: true,
      };

      switch (operation) {
        case 'getBalance': {
          const requestBody = {
            jsonrpc: '2.0',
            method: 'eth_getBalance',
            params: [address, blockParam],
            id: 1,
          };
          
          const options = {
            ...baseOptions,
            body: requestBody,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getTransactionCount': {
          const requestBody = {
            jsonrpc: '2.0',
            method: 'eth_getTransactionCount',
            params: [address, blockParam],
            id: 1,
          };
          
          const options = {
            ...baseOptions,
            body: requestBody,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getCode': {
          const requestBody = {
            jsonrpc: '2.0',
            method: 'eth_getCode',
            params: [address, blockParam],
            id: 1,
          };
          
          const options = {
            ...baseOptions,
            body: requestBody,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getStorageAt': {
          const position = this.getNodeParameter('position', i) as string;
          
          const requestBody = {
            jsonrpc: '2.0',
            method: 'eth_getStorageAt',
            params: [address, position, blockParam],
            id: 1,
          };
          
          const options = {
            ...baseOptions,
            body: requestBody,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeTransactionOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('fantomsonicApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'sendRawTransaction': {
					const signedTransactionData = this.getNodeParameter('signedTransactionData', i) as string;
					
					const requestBody = {
						jsonrpc: '2.0',
						method: 'eth_sendRawTransaction',
						params: [signedTransactionData],
						id: 1,
					};

					const options: any = {
						method: 'POST',
						url: credentials.baseUrl,
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${credentials.apiKey}`,
						},
						body: JSON.stringify(requestBody),
						json: true,
					};

					const response = await this.helpers.httpRequest(options) as any;
					result = response.result || response;
					break;
				}

				case 'getTransaction': {
					const transactionHash = this.getNodeParameter('transactionHash', i) as string;
					
					const requestBody = {
						jsonrpc: '2.0',
						method: 'eth_getTransactionByHash',
						params: [transactionHash],
						id: 1,
					};

					const options: any = {
						method: 'POST',
						url: credentials.baseUrl,
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${credentials.apiKey}`,
						},
						body: JSON.stringify(requestBody),
						json: true,
					};

					const response = await this.helpers.httpRequest(options) as any;
					result = response.result || response;
					break;
				}

				case 'getTransactionReceipt': {
					const transactionHash = this.getNodeParameter('transactionHash', i) as string;
					
					const requestBody = {
						jsonrpc: '2.0',
						method: 'eth_getTransactionReceipt',
						params: [transactionHash],
						id: 1,
					};

					const options: any = {
						method: 'POST',
						url: credentials.baseUrl,
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${credentials.apiKey}`,
						},
						body: JSON.stringify(requestBody),
						json: true,
					};

					const response = await this.helpers.httpRequest(options) as any;
					result = response.result || response;
					break;
				}

				case 'estimateGas': {
					const transaction = this.getNodeParameter('transaction', i) as any;
					
					const requestBody = {
						jsonrpc: '2.0',
						method: 'eth_estimateGas',
						params: [transaction],
						id: 1,
					};

					const options: any = {
						method: 'POST',
						url: credentials.baseUrl,
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${credentials.apiKey}`,
						},
						body: JSON.stringify(requestBody),
						json: true,
					};

					const response = await this.helpers.httpRequest(options) as any;
					result = response.result || response;
					break;
				}

				case 'getTransactionByBlockHashAndIndex': {
					const blockHash = this.getNodeParameter('blockHash', i) as string;
					const index = this.getNodeParameter('index', i) as string;
					
					const requestBody = {
						jsonrpc: '2.0',
						method: 'eth_getTransactionByBlockHashAndIndex',
						params: [blockHash, index],
						id: 1,
					};

					const options: any = {
						method: 'POST',
						url: credentials.baseUrl,
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${credentials.apiKey}`,
						},
						body: JSON.stringify(requestBody),
						json: true,
					};

					const response = await this.helpers.httpRequest(options) as any;
					result = response.result || response;
					break;
				}

				case 'getTransactionByBlockNumberAndIndex': {
					const blockNumber = this.getNodeParameter('blockNumber', i) as string;
					const index = this.getNodeParameter('index', i) as string;
					
					const requestBody = {
						jsonrpc: '2.0',
						method: 'eth_getTransactionByBlockNumberAndIndex',
						params: [blockNumber, index],
						id: 1,
					};

					const options: any = {
						method: 'POST',
						url: credentials.baseUrl,
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${credentials.apiKey}`,
						},
						body: JSON.stringify(requestBody),
						json: true,
					};

					const response = await this.helpers.httpRequest(options) as any;
					result = response.result || response;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeBlockOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('fantomsonicApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getBlockNumber': {
          const requestBody = {
            jsonrpc: '2.0',
            method: 'eth_blockNumber',
            params: [],
            id: 1,
          };

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            body: JSON.stringify(requestBody),
            json: false,
          };

          const response = await this.helpers.httpRequest(options) as any;
          result = JSON.parse(response);
          break;
        }

        case 'getBlockByHash': {
          const blockHash = this.getNodeParameter('blockHash', i) as string;
          const includeTransactions = this.getNodeParameter('includeTransactions', i) as boolean;

          const requestBody = {
            jsonrpc: '2.0',
            method: 'eth_getBlockByHash',
            params: [blockHash, includeTransactions],
            id: 1,
          };

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            body: JSON.stringify(requestBody),
            json: false,
          };

          const response = await this.helpers.httpRequest(options) as any;
          result = JSON.parse(response);
          break;
        }

        case 'getBlockByNumber': {
          const blockNumber = this.getNodeParameter('blockNumber', i) as string;
          const includeTransactions = this.getNodeParameter('includeTransactions', i) as boolean;

          let blockParam = blockNumber;
          if (!isNaN(Number(blockNumber)) && !blockNumber.startsWith('0x')) {
            blockParam = '0x' + parseInt(blockNumber, 10).toString(16);
          }

          const requestBody = {
            jsonrpc: '2.0',
            method: 'eth_getBlockByNumber',
            params: [blockParam, includeTransactions],
            id: 1,
          };

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            body: JSON.stringify(requestBody),
            json: false,
          };

          const response = await this.helpers.httpRequest(options) as any;
          result = JSON.parse(response);
          break;
        }

        case 'getBlockTransactionCountByHash': {
          const blockHash = this.getNodeParameter('blockHash', i) as string;

          const requestBody = {
            jsonrpc: '2.0',
            method: 'eth_getBlockTransactionCountByHash',
            params: [blockHash],
            id: 1,
          };

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            body: JSON.stringify(requestBody),
            json: false,
          };

          const response = await this.helpers.httpRequest(options) as any;
          result = JSON.parse(response);
          break;
        }

        case 'getBlockTransactionCountByNumber': {
          const blockNumber = this.getNodeParameter('blockNumber', i) as string;

          let blockParam = blockNumber;
          if (!isNaN(Number(blockNumber)) && !blockNumber.startsWith('0x')) {
            blockParam = '0x' + parseInt(blockNumber, 10).toString(16);
          }

          const requestBody = {
            jsonrpc: '2.0',
            method: 'eth_getBlockTransactionCountByNumber',
            params: [blockParam],
            id: 1,
          };

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            body: JSON.stringify(requestBody),
            json: false,
          };

          const response = await this.helpers.httpRequest(options) as any;
          result = JSON.parse(response);
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeSmartContractOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('fantomsonicApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const requestId = Math.floor(Math.random() * 10000);

      switch (operation) {
        case 'call': {
          const transaction = this.getNodeParameter('transaction', i) as any;
          const blockNumber = this.getNodeParameter('blockNumber', i, 'latest') as string;
          
          const body = {
            jsonrpc: '2.0',
            method: 'eth_call',
            params: [transaction, blockNumber],
            id: requestId,
          };

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': credentials.apiKey,
            },
            body: JSON.stringify(body),
            json: false,
          };

          const response = await this.helpers.httpRequest(options) as any;
          const parsedResponse = JSON.parse(response);
          
          if (parsedResponse.error) {
            throw new Error(`JSON-RPC Error: ${parsedResponse.error.message}`);
          }
          
          result = parsedResponse.result;
          break;
        }

        case 'estimateGas': {
          const transaction = this.getNodeParameter('transaction', i) as any;
          
          const body = {
            jsonrpc: '2.0',
            method: 'eth_estimateGas',
            params: [transaction],
            id: requestId,
          };

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': credentials.apiKey,
            },
            body: JSON.stringify(body),
            json: false,
          };

          const response = await this.helpers.httpRequest(options) as any;
          const parsedResponse = JSON.parse(response);
          
          if (parsedResponse.error) {
            throw new Error(`JSON-RPC Error: ${parsedResponse.error.message}`);
          }
          
          result = {
            gasEstimate: parsedResponse.result,
            gasEstimateDecimal: parseInt(parsedResponse.result, 16),
          };
          break;
        }

        case 'getCode': {
          const contractAddress = this.getNodeParameter('contractAddress', i) as string;
          const blockNumber = this.getNodeParameter('blockNumber', i, 'latest') as string;
          
          const body = {
            jsonrpc: '2.0',
            method: 'eth_getCode',
            params: [contractAddress, blockNumber],
            id: requestId,
          };

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': credentials.apiKey,
            },
            body: JSON.stringify(body),
            json: false,
          };

          const response = await this.helpers.httpRequest(options) as any;
          const parsedResponse = JSON.parse(response);
          
          if (parsedResponse.error) {
            throw new Error(`JSON-RPC Error: ${parsedResponse.error.message}`);
          }
          
          result = {
            address: contractAddress,
            bytecode: parsedResponse.result,
            isContract: parsedResponse.result !== '0x',
          };
          break;
        }

        case 'getLogs': {
          const filterObject = this.getNodeParameter('filterObject', i) as any;
          
          const body = {
            jsonrpc: '2.0',
            method: 'eth_getLogs',
            params: [filterObject],
            id: requestId,
          };

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': credentials.apiKey,
            },
            body: JSON.stringify(body),
            json: false,
          };

          const response = await this.helpers.httpRequest(options) as any;
          const parsedResponse = JSON.parse(response);
          
          if (parsedResponse.error) {
            throw new Error(`JSON-RPC Error: ${parsedResponse.error.message}`);
          }
          
          result = {
            logs: parsedResponse.result,
            count: parsedResponse.result.length,
          };
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeNetworkOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('fantomsonicApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const networkType = this.getNodeParameter('networkType', i) as string;
      const baseUrl = networkType === 'mainnet' ? 'https://rpc.sonic.fantom.network/' : 'https://rpc.testnet.soniclabs.com/';

      switch (operation) {
        case 'getChainId': {
          const requestBody = {
            jsonrpc: '2.0',
            method: 'eth_chainId',
            params: [],
            id: 1
          };
          const options: any = {
            method: 'POST',
            url: baseUrl,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${credentials.apiKey}`
            },
            body: JSON.stringify(requestBody)
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        case 'getGasPrice': {
          const requestBody = {
            jsonrpc: '2.0',
            method: 'eth_gasPrice',
            params: [],
            id: 1
          };
          const options: any = {
            method: 'POST',
            url: baseUrl,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${credentials.apiKey}`
            },
            body: JSON.stringify(requestBody)
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        case 'getRecommendedGasPrice': {
          const requestBody = {
            jsonrpc: '2.0',
            method: 'eth_maxPriorityFeePerGas',
            params: [],
            id: 1
          };
          const options: any = {
            method: 'POST',
            url: baseUrl,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${credentials.apiKey}`
            },
            body: JSON.stringify(requestBody)
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        case 'getSyncStatus': {
          const requestBody = {
            jsonrpc: '2.0',
            method: 'eth_syncing',
            params: [],
            id: 1
          };
          const options: any = {
            method: 'POST',
            url: baseUrl,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${credentials.apiKey}`
            },
            body: JSON.stringify(requestBody)
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        case 'getNetworkVersion': {
          const requestBody = {
            jsonrpc: '2.0',
            method: 'net_version',
            params: [],
            id: 1
          };
          const options: any = {
            method: 'POST',
            url: baseUrl,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${credentials.apiKey}`
            },
            body: JSON.stringify(requestBody)
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i }
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeStakingOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('fantomsonicApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getValidators': {
          const blockNumber = this.getNodeParameter('blockNumber', i, 'latest') as string;
          
          const requestBody = {
            jsonrpc: '2.0',
            method: 'ftm_getValidators',
            params: [blockNumber],
            id: 1,
          };

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            body: JSON.stringify(requestBody),
            json: false,
          };

          const response = await this.helpers.httpRequest(options) as any;
          const responseData = JSON.parse(response);
          
          if (responseData.error) {
            throw new Error(`RPC Error: ${responseData.error.message}`);
          }
          
          result = responseData.result;
          break;
        }

        case 'getValidator': {
          const validatorAddress = this.getNodeParameter('validatorAddress', i) as string;
          const blockNumber = this.getNodeParameter('blockNumber', i, 'latest') as string;
          
          const requestBody = {
            jsonrpc: '2.0',
            method: 'ftm_getValidator',
            params: [validatorAddress, blockNumber],
            id: 1,
          };

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            body: JSON.stringify(requestBody),
            json: false,
          };

          const response = await this.helpers.httpRequest(options) as any;
          const responseData = JSON.parse(response);
          
          if (responseData.error) {
            throw new Error(`RPC Error: ${responseData.error.message}`);
          }
          
          result = responseData.result;
          break;
        }

        case 'getDelegation': {
          const delegatorAddress = this.getNodeParameter('delegatorAddress', i) as string;
          const validatorAddress = this.getNodeParameter('validatorAddress', i) as string;
          
          const requestBody = {
            jsonrpc: '2.0',
            method: 'ftm_getDelegation',
            params: [delegatorAddress, validatorAddress],
            id: 1,
          };

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            body: JSON.stringify(requestBody),
            json: false,
          };

          const response = await this.helpers.httpRequest(options) as any;
          const responseData = JSON.parse(response);
          
          if (responseData.error) {
            throw new Error(`RPC Error: ${responseData.error.message}`);
          }
          
          result = responseData.result;
          break;
        }

        case 'getStakingRewards': {
          const delegatorAddress = this.getNodeParameter('delegatorAddress', i) as string;
          const blockNumber = this.getNodeParameter('blockNumber', i, 'latest') as string;
          
          const requestBody = {
            jsonrpc: '2.0',
            method: 'ftm_getStakingRewards',
            params: [delegatorAddress, blockNumber],
            id: 1,
          };

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            body: JSON.stringify(requestBody),
            json: false,
          };

          const response = await this.helpers.httpRequest(options) as any;
          const responseData = JSON.parse(response);
          
          if (responseData.error) {
            throw new Error(`RPC Error: ${responseData.error.message}`);
          }
          
          result = responseData.result;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}
