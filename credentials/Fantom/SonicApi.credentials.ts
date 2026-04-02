import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class FantomSonicApi implements ICredentialType {
	name = 'fantomSonicApi';
	displayName = 'Fantom/Sonic API';
	documentationUrl = 'https://docs.sonic.fantom.network/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'API key for authenticated requests (required for third-party providers like Ankr, QuickNode, or Alchemy)',
		},
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://rpc.sonic.fantom.network/',
			description: 'Base URL for the Fantom/Sonic RPC endpoint',
		},
		{
			displayName: 'Network',
			name: 'network',
			type: 'options',
			options: [
				{
					name: 'Sonic Mainnet',
					value: 'mainnet',
				},
				{
					name: 'Sonic Testnet',
					value: 'testnet',
				},
			],
			default: 'mainnet',
			description: 'Network to connect to',
		},
	];
}