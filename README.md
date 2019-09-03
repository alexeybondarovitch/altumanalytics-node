# AltumAnalytics.js

AltumAnalytics.js is designed to collect customer data and send it to machine learning service for future processing.

We prefer to associate our library with a smart advisor called Altum.

Altum helps you measure your users, product, and business. It calculates statistic for your business and generate advises about your customers, provide charts and different integrations.

## Documentation

### Installation

Install from NPM

```
npm install --save altumanalytics
```

or if you want to specify version:

```
npm install --save altumanalytics@version      (i.e. npm install --save altumanalytics@1.2.15)
```

### Include the library via script or manually and initialize it

Ideally you would use module loader or compilation step to import using ES6 modules as:

```javascript
import { Altum } from 'altumanalytics';

Altum.init({productId: 'PRODUCT ID', groupId: 'GROUP_ID', userId: 'USER ID'});
```

If you prefer CommonJS modules then the library can be included as

```javascript
const Altum = require('altumanalytics').Altum;

Altum.init({productId: 'PRODUCT ID', groupId: 'GROUP_ID', userId: 'USER ID'});
```

### Initialization

Altum is exported as the Singleton, so you don't need to create a new instance.

Call ```Altum.init``` to initialize library.

```javascript
  Altum.init(configurationObject);
```

<b>configurationObject</b> contains next properties:

| Property Name | Type  |  Required | Description
|-------------------|-----------------|--------------|--------------|
| productId  | String | Required | Your unique product Id. Exception will be thrown if not provided.|
| groupId  | String | Required | Unique identifier per license.|
| userId  | String | Required | Current signed in userId. (Usually Db Key).|

<b>Note:</b> ```Altum.init``` method can be called several times to change current product or current user.

### Examples:

Init library after user sign in and specify the product:

```javascript
Altum.init({productId: 'test', groupId: '123', userId: '12345'});
```

## Usage

Altum provide only one API method which should be used in your application:

### <b>Log</b> method definition:

```javascript
Altum.log(event, count, options);
```

The ```Altum.log``` method is how you send any event with it's data to our processing center.

The ```log``` call has the folowing parameters:


| Parameter Name | Required | Type  |  Description |
|-------------------|-----------------|--------------|---------------------|
| event  |  Required |  String or Object | Event Type which will be used to identificate tracked event. If object provided, it should include property <b>type</b> in it.|
| count  |  Required |  Float Number | Positive Number which will be associated with tracked event.<i>Note: If you do not pass a count, pass 1 as default.</i>|
|options | Optional | Object | A dictionary of options (see details below). |


<b>Options</b> object may contain next properties:

| Property Name | Type  |  Description |
|-------------------|-----------------|--------------|
| data  | Object | Any data associated with tracked event. |
| time  |  TimeStamp | js representation of time (example ```(new Date).getTime()```). If not provided, current UTC time will be used|
|groups |  Array | Array of groups to categorize event for future using |

### Examples

Log any custom event:

```javascript
Altum.log('My Amazing Event', 1)
```

Log javascript click event:

```javascript
const eventObj = { type: 'click' };  //here will be js event object
Altum.log(eventObj, 1);
```

Log event with custom data object:

```javascript
Altum.log(eventObj, 1, { data: { customProperty: 'customValue' }});
```

Log event with several groups:

```javascript
Altum.log('Grouped event', 1, { groups: ['First', 'Second']});
```

Log historical event:

```javascript
const historicalTime = (new Date('01-03-2015')).getTime();
Altum.log('Grouped event', 1, { time: historicalTime });
```

Log user payment event:

```javascript
Altum.log('Payment', 100.34, { data: { objectId: 'egwg1251f' }, groups: ['Payments'] })
```
