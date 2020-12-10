# truffle-contract-bug
 The @truffle/contract package cannot link correctly libraries to new contracts.


 
 #### Issue: https://github.com/trufflesuite/truffle/issues/3584
 
 
 #### Error:

 ´´´
 (node:6260) UnhandledPromiseRejectionWarning: TypeError: library_address.replace is not a function
    at Main.<anonymous> (C:\Dev\pruebas\metacoin\index.ts:39:60)
    at step (C:\Dev\pruebas\metacoin\index.ts:33:23)
    at Object.next (C:\Dev\pruebas\metacoin\index.ts:14:53)
    at fulfilled (C:\Dev\pruebas\metacoin\index.ts:5:58)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
 ´´´
