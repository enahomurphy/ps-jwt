'use strict';


angular.module('psJwtApp')
  .service('authInterceptor', function (authToken) {
      return {
        request: function(config) {
          var token = authToken.getToken();
          if(token)
              config.headers.Authorization = 'Bearer ' + token

            console.log(config.headers)
            return config
        },

        response : function(response) {
            //console.log(response)
            return response
        }
      }
  });
