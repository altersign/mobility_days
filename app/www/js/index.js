/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // default coordinates are "Museum für Kommunikation Nürnberg" (Hackathon location)
    latitude: '49.4461443',
    longitude: '11.0744655',

    locationService: 'GoogleLocator',

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        this.updateLocation();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    updateLocation: function () {
        // onSuccess Callback
        // This method accepts a Position object, which contains the
        // current GPS coordinates
        var onSuccess = function(position) {
            /*alert('Latitude: '          + position.coords.latitude          + '\n' +
                  'Longitude: '         + position.coords.longitude         + '\n' +
                  'Altitude: '          + position.coords.altitude          + '\n' +
                  'Accuracy: '          + position.coords.accuracy          + '\n' +
                  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                  'Heading: '           + position.coords.heading           + '\n' +
                  'Speed: '             + position.coords.speed             + '\n' +
                  'Timestamp: '         + position.timestamp                + '\n');*/
            console.log('Received position: ');
            console.log(position);
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.renderLocation();
        };

        // onError Callback receives a PositionError object
        //
        var onError = function (error) {
            console.log('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
            this.renderLocation();

        };

        navigator.geolocation.getCurrentPosition(
            onSuccess.bind(this),
            onError.bind(this),
            { timeout: 30000, enableHighAccuracy: true }
        );
    },

    renderLocation: function () {
            var parentElement = document.getElementById("current-location");
            var latitudeElement = parentElement.querySelector('.latitude');
            var longitudeElement = parentElement.querySelector('.longitude');

            latitudeElement.textContent = this.latitude;
            longitudeElement.textContent = this.longitude;
            parentElement.setAttribute('style', 'display:block;');
    }

};

app.initialize();