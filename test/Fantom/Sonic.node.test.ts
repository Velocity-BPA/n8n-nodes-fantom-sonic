/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { FantomSonic } from '../nodes/Fantom/Sonic/Fantom/Sonic.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('FantomSonic Node', () => {
  let node: FantomSonic;

  beforeAll(() => {
    node = new FantomSonic();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('Fantom/Sonic');
      expect(node.description.name).toBe('fantomsonic');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 6 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(6);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(6);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('Account Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-key',
        baseUrl: 'https://rpc.sonic.fantom.network/',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  describe('getBalance operation', () => {
    it('should get account balance successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getBalance')
        .mockReturnValueOnce('0x742d35Cc6634C0532925a3b8D40E1F3E8b2C64E5')
        .mockReturnValueOnce('latest');

      const mockResponse = {
        jsonrpc: '2.0',
        id: 1,
        result: '0x1b1ae4d6e2ef500000',
      };

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeAccountOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{
        json: mockResponse,
        pairedItem: { item: 0 },
      }]);
    });

    it('should handle getBalance errors', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getBalance')
        .mockReturnValueOnce('invalid-address')
        .mockReturnValueOnce('latest');

      mockExecuteFunctions.continueOnFail.mockReturnValue(true);
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Invalid address'));

      const result = await executeAccountOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{
        json: { error: 'Invalid address' },
        pairedItem: { item: 0 },
      }]);
    });
  });

  describe('getTransactionCount operation', () => {
    it('should get transaction count successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getTransactionCount')
        .mockReturnValueOnce('0x742d35Cc6634C0532925a3b8D40E1F3E8b2C64E5')
        .mockReturnValueOnce('latest');

      const mockResponse = {
        jsonrpc: '2.0',
        id: 1,
        result: '0x1a',
      };

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeAccountOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{
        json: mockResponse,
        pairedItem: { item: 0 },
      }]);
    });
  });

  describe('getCode operation', () => {
    it('should get contract code successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getCode')
        .mockReturnValueOnce('0x742d35Cc6634C0532925a3b8D40E1F3E8b2C64E5')
        .mockReturnValueOnce('latest');

      const mockResponse = {
        jsonrpc: '2.0',
        id: 1,
        result: '0x608060405234801561001057600080fd5b50',
      };

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeAccountOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{
        json: mockResponse,
        pairedItem: { item: 0 },
      }]);
    });
  });

  describe('getStorageAt operation', () => {
    it('should get storage value successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getStorageAt')
        .mockReturnValueOnce('0x742d35Cc6634C0532925a3b8D40E1F3E8b2C64E5')
        .mockReturnValueOnce('latest')
        .mockReturnValueOnce('')
        .mockReturnValueOnce('0x0');

      const mockResponse = {
        jsonrpc: '2.0',
        id: 1,
        result: '0x0000000000000000000000000000000000000000000000000000000000000000',
      };

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeAccountOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{
        json: mockResponse,
        pairedItem: { item: 0 },
      }]);
    });
  });
});

describe('Transaction Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://rpc.sonic.fantom.network/',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	it('should send raw transaction successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('sendRawTransaction');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('0x123abc');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			result: '0x456def',
		});

		const result = await executeTransactionOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([
			{
				json: '0x456def',
				pairedItem: { item: 0 },
			},
		]);
	});

	it('should get transaction by hash successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getTransaction');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('0x123abc');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			result: {
				hash: '0x123abc',
				from: '0x456def',
				to: '0x789ghi',
			},
		});

		const result = await executeTransactionOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([
			{
				json: {
					hash: '0x123abc',
					from: '0x456def',
					to: '0x789ghi',
				},
				pairedItem: { item: 0 },
			},
		]);
	});

	it('should get transaction receipt successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getTransactionReceipt');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('0x123abc');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			result: {
				transactionHash: '0x123abc',
				status: '0x1',
				gasUsed: '0x5208',
			},
		});

		const result = await executeTransactionOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([
			{
				json: {
					transactionHash: '0x123abc',
					status: '0x1',
					gasUsed: '0x5208',
				},
				pairedItem: { item: 0 },
			},
		]);
	});

	it('should estimate gas successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('estimateGas');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce({
			to: '0x123abc',
			value: '0x1000',
		});
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			result: '0x5208',
		});

		const result = await executeTransactionOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([
			{
				json: '0x5208',
				pairedItem: { item: 0 },
			},
		]);
	});

	it('should handle API errors', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getTransaction');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('0x123abc');
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Network error'));
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);

		const result = await executeTransactionOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([
			{
				json: { error: 'Network error' },
				pairedItem: { item: 0 },
			},
		]);
	});

	it('should throw error for unknown operation', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('unknownOperation');

		await expect(
			executeTransactionOperations.call(mockExecuteFunctions, [{ json: {} }])
		).rejects.toThrow('Unknown operation: unknownOperation');
	});
});

describe('Block Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-key', 
        baseUrl: 'https://rpc.sonic.fantom.network/' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  it('should get latest block number successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValue('getBlockNumber');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(
      JSON.stringify({ jsonrpc: '2.0', result: '0x1234567', id: 1 })
    );

    const items = [{ json: {} }];
    const result = await executeBlockOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json.result).toBe('0x1234567');
  });

  it('should handle get block number error', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValue('getBlockNumber');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Network error'));
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const items = [{ json: {} }];
    const result = await executeBlockOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('Network error');
  });

  it('should get block by hash successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getBlockByHash')
      .mockReturnValueOnce('0xabcdef123456')
      .mockReturnValueOnce(true);
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(
      JSON.stringify({ 
        jsonrpc: '2.0', 
        result: { 
          number: '0x1234', 
          hash: '0xabcdef123456',
          transactions: []
        }, 
        id: 1 
      })
    );

    const items = [{ json: {} }];
    const result = await executeBlockOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json.result.hash).toBe('0xabcdef123456');
  });

  it('should get block by number successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getBlockByNumber')
      .mockReturnValueOnce('latest')
      .mockReturnValueOnce(false);
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(
      JSON.stringify({ 
        jsonrpc: '2.0', 
        result: { 
          number: '0x1234', 
          hash: '0xabcdef123456'
        }, 
        id: 1 
      })
    );

    const items = [{ json: {} }];
    const result = await executeBlockOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json.result.number).toBe('0x1234');
  });

  it('should get block transaction count by hash successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getBlockTransactionCountByHash')
      .mockReturnValueOnce('0xabcdef123456');
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(
      JSON.stringify({ jsonrpc: '2.0', result: '0x10', id: 1 })
    );

    const items = [{ json: {} }];
    const result = await executeBlockOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json.result).toBe('0x10');
  });

  it('should get block transaction count by number successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getBlockTransactionCountByNumber')
      .mockReturnValueOnce('100');
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(
      JSON.stringify({ jsonrpc: '2.0', result: '0x5', id: 1 })
    );

    const items = [{ json: {} }];
    const result = await executeBlockOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json.result).toBe('0x5');
  });
});

describe('Smart Contract Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ apiKey: 'test-key', baseUrl: 'https://rpc.sonic.fantom.network/' }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { httpRequest: jest.fn(), requestWithAuthentication: jest.fn() },
    };
  });

  it('should call smart contract function successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('call')
      .mockReturnValueOnce({ to: '0x123', data: '0xabc' })
      .mockReturnValueOnce('latest');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(
      JSON.stringify({ jsonrpc: '2.0', result: '0x1234567890abcdef', id: 1 })
    );

    const result = await executeSmartContractOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: '0x1234567890abcdef', pairedItem: { item: 0 } }]);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://rpc.sonic.fantom.network/',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': 'test-key' },
      body: expect.stringContaining('eth_call'),
      json: false,
    });
  });

  it('should estimate gas successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('estimateGas')
      .mockReturnValueOnce({ to: '0x123', data: '0xabc' });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(
      JSON.stringify({ jsonrpc: '2.0', result: '0x5208', id: 1 })
    );

    const result = await executeSmartContractOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result[0].json).toEqual({
      gasEstimate: '0x5208',
      gasEstimateDecimal: 21000,
    });
  });

  it('should get contract code successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getCode')
      .mockReturnValueOnce('0x1234567890abcdef')
      .mockReturnValueOnce('latest');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(
      JSON.stringify({ jsonrpc: '2.0', result: '0x608060405234801561001057600080fd5b50', id: 1 })
    );

    const result = await executeSmartContractOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result[0].json).toEqual({
      address: '0x1234567890abcdef',
      bytecode: '0x608060405234801561001057600080fd5b50',
      isContract: true,
    });
  });

  it('should get logs successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getLogs')
      .mockReturnValueOnce({ address: '0x123', fromBlock: '0x1' });

    const mockLogs = [{ address: '0x123', topics: ['0xabc'], data: '0xdef' }];
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(
      JSON.stringify({ jsonrpc: '2.0', result: mockLogs, id: 1 })
    );

    const result = await executeSmartContractOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result[0].json).toEqual({
      logs: mockLogs,
      count: 1,
    });
  });

  it('should handle JSON-RPC errors', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('call')
      .mockReturnValueOnce({ to: '0x123' })
      .mockReturnValueOnce('latest');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(
      JSON.stringify({ jsonrpc: '2.0', error: { code: -32000, message: 'execution reverted' }, id: 1 })
    );

    await expect(executeSmartContractOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('JSON-RPC Error: execution reverted');
  });

  it('should handle network errors with continueOnFail', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('call');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Network error'));
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const result = await executeSmartContractOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: { error: 'Network error' }, pairedItem: { item: 0 } }]);
  });
});

describe('Network Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ apiKey: 'test-key' }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { httpRequest: jest.fn() },
    };
  });

  it('should get chain ID successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getChainId')
      .mockReturnValueOnce('mainnet');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      jsonrpc: '2.0',
      id: 1,
      result: '0xfa'
    });

    const result = await executeNetworkOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.result).toBe('0xfa');
  });

  it('should get gas price successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getGasPrice')
      .mockReturnValueOnce('mainnet');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      jsonrpc: '2.0',
      id: 1,
      result: '0x9502f9000'
    });

    const result = await executeNetworkOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.result).toBe('0x9502f9000');
  });

  it('should get sync status successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getSyncStatus')
      .mockReturnValueOnce('testnet');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      jsonrpc: '2.0',
      id: 1,
      result: false
    });

    const result = await executeNetworkOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.result).toBe(false);
  });

  it('should handle API errors gracefully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getChainId')
      .mockReturnValueOnce('mainnet');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const result = await executeNetworkOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('API Error');
  });

  it('should throw error when continueOnFail is false', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getNetworkVersion')
      .mockReturnValueOnce('mainnet');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Network Error'));
    mockExecuteFunctions.continueOnFail.mockReturnValue(false);

    await expect(executeNetworkOperations.call(mockExecuteFunctions, [{ json: {} }]))
      .rejects.toThrow('Network Error');
  });
});

describe('Staking Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-key',
        baseUrl: 'https://rpc.sonic.fantom.network/',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  describe('getValidators', () => {
    it('should get validators successfully', async () => {
      const mockResponse = JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        result: [
          {
            id: '1',
            address: '0x123...',
            stake: '1000000000000000000000',
            delegatedMe: '5000000000000000000000',
          },
        ],
      });

      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getValidators')
        .mockReturnValueOnce('latest');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce(mockResponse);

      const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual([
        {
          id: '1',
          address: '0x123...',
          stake: '1000000000000000000000',
          delegatedMe: '5000000000000000000000',
        },
      ]);
    });

    it('should handle RPC errors for getValidators', async () => {
      const mockErrorResponse = JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        error: { code: -32000, message: 'Invalid block number' },
      });

      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getValidators')
        .mockReturnValueOnce('invalid');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce(mockErrorResponse);

      await expect(
        executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }])
      ).rejects.toThrow('RPC Error: Invalid block number');
    });
  });

  describe('getValidator', () => {
    it('should get validator information successfully', async () => {
      const mockResponse = JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        result: {
          id: '1',
          address: '0x123...',
          stake: '1000000000000000000000',
          delegatedMe: '5000000000000000000000',
          createdEpoch: 1,
          createdTime: '1234567890',
        },
      });

      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getValidator')
        .mockReturnValueOnce('0x123...')
        .mockReturnValueOnce('latest');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce(mockResponse);

      const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json.address).toBe('0x123...');
    });
  });

  describe('getDelegation', () => {
    it('should get delegation information successfully', async () => {
      const mockResponse = JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        result: {
          amount: '1000000000000000000',
          createdEpoch: 1,
          createdTime: '1234567890',
          deactivatedEpoch: 0,
          deactivatedTime: '0',
        },
      });

      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getDelegation')
        .mockReturnValueOnce('0x456...')
        .mockReturnValueOnce('0x123...');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce(mockResponse);

      const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json.amount).toBe('1000000000000000000');
    });
  });

  describe('getStakingRewards', () => {
    it('should get staking rewards successfully', async () => {
      const mockResponse = JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        result: '500000000000000000',
      });

      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getStakingRewards')
        .mockReturnValueOnce('0x456...')
        .mockReturnValueOnce('latest');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce(mockResponse);

      const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toBe('500000000000000000');
    });
  });

  it('should handle unknown operation', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('unknownOperation');

    await expect(
      executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }])
    ).rejects.toThrow('Unknown operation: unknownOperation');
  });

  it('should handle continue on fail', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getValidators');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValueOnce(new Error('Network error'));
    mockExecuteFunctions.continueOnFail.mockReturnValueOnce(true);

    const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('Network error');
  });
});
});
