// This file is auto-generated by @hey-api/openapi-ts

export type PostQData = {
  body: Array<{
    /**
     * The world address to query.
     */
    address: string;
    /**
     * The SQL query to execute.
     */
    query: string;
  }>;
};

export type PostQResponse = {
  /**
   * Latest indexed block.
   */
  block_height: number;
  result: Array<Array<Array<string>>>;
};

export type PostQError = {
  /**
   * Error message describing the error
   */
  msg: string;
};