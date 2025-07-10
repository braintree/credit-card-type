console.log('🧪 Testing various ESM import patterns...');

try {
  // Test 1: Default only import
  console.log('  Testing default-only import...');
  const { default: creditCardType1 } = await import('../../dist/esm/index.js');
  if (!creditCardType1('4111')[0] || creditCardType1('4111')[0].type !== 'visa') {
    throw new Error('Default-only import failed');
  }

  // Test 2: Named only imports
  console.log('  Testing named-only imports...');
  const { getTypeInfo, types } = await import('../../dist/esm/index.js');
  if (!getTypeInfo(types.VISA) || getTypeInfo(types.VISA).type !== 'visa') {
    throw new Error('Named-only imports failed');
  }

  // Test 3: Mixed import (default + named)
  console.log('  Testing mixed imports...');
  const { default: creditCardType2, addCard, resetModifications } = await import('../../dist/esm/index.js');
  if (!creditCardType2 || typeof addCard !== 'function' || typeof resetModifications !== 'function') {
    throw new Error('Mixed import failed');
  }

  // Test the mixed imports actually work
  addCard({
    niceType: 'Mixed Import Test',
    type: 'mixed-test',
    patterns: [7777],
    gaps: [4, 8, 12],
    lengths: [16],
    code: { name: 'CVV', size: 3 }
  });

  const mixedResult = creditCardType2('7777');
  if (!mixedResult || mixedResult[0].type !== 'mixed-test') {
    throw new Error('Mixed import functionality failed');
  }

  resetModifications();

  // Test 4: Namespace import
  console.log('  Testing namespace import...');
  const CCType = await import('../../dist/esm/index.js');
  if (!CCType.default || !CCType.getTypeInfo || !CCType.types || !CCType.addCard) {
    throw new Error('Namespace import failed');
  }

  // Test namespace import functionality
  const namespaceResult = CCType.default('4111');
  if (!namespaceResult || namespaceResult[0].type !== 'visa') {
    throw new Error('Namespace import functionality failed');
  }

  // Test 5: Re-import consistency (modules should be cached)
  console.log('  Testing re-import consistency...');
  const module1 = await import('../../dist/esm/index.js');
  const module2 = await import('../../dist/esm/index.js');

  const result1 = module1.default('4111')[0].type;
  const result2 = module2.default('4111')[0].type;

  if (result1 !== result2) {
    throw new Error('Re-import consistency failed');
  }

  // Test that they're actually the same module (reference equality)
  if (module1.default !== module2.default) {
    throw new Error('Module caching failed - imports should be same reference');
  }

  // Test 6: Destructuring with renaming
  console.log('  Testing destructuring with renaming...');
  const {
    default: creditCardTypeRenamed,
    getTypeInfo: getInfo,
    types: cardTypes
  } = await import('../../dist/esm/index.js');

  if (!creditCardTypeRenamed || !getInfo || !cardTypes) {
    throw new Error('Destructuring with renaming failed');
  }

  const renamedResult = creditCardTypeRenamed('5555555555554444');
  if (!renamedResult || renamedResult[0].type !== 'mastercard') {
    throw new Error('Renamed import functionality failed');
  }

  // Test 7: Selective named imports
  console.log('  Testing selective named imports...');
  const { updateCard, changeOrder } = await import('../../dist/esm/index.js');
  if (typeof updateCard !== 'function' || typeof changeOrder !== 'function') {
    throw new Error('Selective named imports failed');
  }

  // Test 8: Dynamic import patterns
  console.log('  Testing dynamic import patterns...');
  const modulePath = '../../dist/esm/index.js';
  const dynamicModule = await import(modulePath);

  if (!dynamicModule.default || !dynamicModule.types) {
    throw new Error('Dynamic import pattern failed');
  }

  // Test 9: Verify all expected exports are present
  console.log('  Testing all expected exports...');
  const fullModule = await import('../../dist/esm/index.js');
  const expectedExports = [
    'default', 'getTypeInfo', 'types', 'addCard', 'removeCard',
    'updateCard', 'changeOrder', 'resetModifications', 'creditCardType'
  ];

  for (const exportName of expectedExports) {
    if (!(exportName in fullModule)) {
      throw new Error(`Missing expected export: ${exportName}`);
    }
  }

  console.log('✅ All ESM import patterns work!');
} catch (error) {
  console.error('❌ ESM import patterns failed:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}