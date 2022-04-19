"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
	if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const constants_1 = require("@nestjs/core/injector/constants");
let Scanner = class Scanner {
	constructor(discoveryService) {
		this.discoveryService = discoveryService;
	}
	onModuleInit() {
		this.container = this.findContainer();
		// console.log('this.findContainer()....................', this.findContainer())
	}
	findInjectable(metaType) {
		if (!metaType) {
			return undefined;
		}
		const modules = this.container.getModules().values();
		for (const module of modules) {
			if(module.injectables.size > 0){
				// console.log('module.injectables.................', module.injectables.)
				const instanceWrapper = module.injectables.get(metaType);
				console.log('instanceWrapper............', instanceWrapper)
				if (instanceWrapper && module.injectables.has(metaType) && instanceWrapper.metatype === metaType) {
					// console.log('instanceWrapper................', instanceWrapper)
					// const instanceWrapper = instanceWrapper.instance()
					// if (instanceWrapper) {
					const instanceHost = instanceWrapper.getInstanceByContextId(constants_1.STATIC_CONTEXT);
					if (instanceHost.isResolved && instanceHost.instance) {
						return instanceHost.instance;
					}
					// }
				}
			}
		}
	}
	findProviderByName(name) {
		const modules = this.container.getModules().values();
		for (const module of modules) {
			const instanceWrapper = module.providers.get(name);
			if (instanceWrapper && module.providers.has(name)) {
				const instanceWrapper = module.providers.get(name);
				if (instanceWrapper) {
					const instanceHost = instanceWrapper.getInstanceByContextId(constants_1.STATIC_CONTEXT);
					if (instanceHost.isResolved && instanceHost.instance) {
						return instanceHost.instance;
					}
				}
			}
		}
	}
	findContainer() {
		const providers = this.discoveryService.getProviders();
		if (providers.length === 0) {
			return;
		}
		const module = providers[0].host;
		return module.container;
	}
	findContextModule(constructor) {
		const className = constructor.name;
		if (!className) {
			return;
		}
		for (const [, module] of [...this.container.getModules().entries()]) {
			if (this.findProviderByClassName(module, className)) {
				return module;
			}
		}
		return;
	}
	findContextModuleName(constructor) {
		const className = constructor.name;
		if (!className) {
			return '';
		}
		for (const [key, module] of [...this.container.getModules().entries()]) {
			if (this.findProviderByClassName(module, className)) {
				return key;
			}
		}
		return '';
	}
	findInjectableInstance(context, metaTypeOrName) {
		const collection = this.container.getModules();
		const module = collection.get(context);
		if (!module) {
			return undefined;
		}
		const injectables = module.injectables;
		return injectables.get(typeof metaTypeOrName === 'string' ? metaTypeOrName : metaTypeOrName.name);
	}
	findProviderInstance(context, metaTypeOrName) {
		const collection = this.container.getModules();
		const module = collection.get(context);
		if (!module) {
			return undefined;
		}
		const providers = module.providers;
		return providers.get(typeof metaTypeOrName === 'string' ? metaTypeOrName : metaTypeOrName.name);
	}
	findProviderByClassName(module, className) {
		const { providers } = module;
		const hasProvider = [...providers.keys()].some(provider => provider === className);
		return hasProvider;
	}
};
Scanner = __decorate([
	common_1.Injectable(),
	__metadata("design:paramtypes", [core_1.DiscoveryService])
], Scanner);
exports.Scanner = Scanner;
