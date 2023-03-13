import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateAuctionOrderDto,
  CreateOrderDto,
  PlaceBidDto,
} from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  async findAll(filter: string) {
    let returnOrderObject = [];
    try {
      if (filter == 'all') {
        let sellOrders = await this.prismaService.sellOrder.findMany({
          where: {
            active: true,
          },
          select: {
            order_id: true,
            price: true,
            nft: {
              select: {
                name: true,
                image: true,
                collection: {
                  select: {
                    name: true,
                  },
                },
                AuctionOrder: {
                  select: {
                    Bids: {
                      select: {
                        bid_amount: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });
        let auctionOrder = await this.prismaService.auctionOrder.findMany({
          where: {
            active: true,
          },
          select: {
            order_id: true,
            nft: {
              select: {
                name: true,
                image: true,
                collection: {
                  select: {
                    name: true,
                  },
                },
                AuctionOrder: {
                  select: {
                    ending_date: true,
                    Bids: {
                      select: {
                        bid_amount: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });
        returnOrderObject.push(...sellOrders, auctionOrder);
      } else if (filter == 'Buy Now') {
        let sellOrders = await this.prismaService.sellOrder.findMany({
          where: {
            active: true,
          },
          select: {
            order_id: true,
            price: true,
            nft: {
              select: {
                name: true,
                image: true,
                collection: {
                  select: {
                    name: true,
                  },
                },
                AuctionOrder: {
                  select: {
                    Bids: {
                      select: {
                        bid_amount: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });
        returnOrderObject.push(sellOrders);
      } else if (filter == 'Auction') {
        let auctionOrder = await this.prismaService.auctionOrder.findMany({
          where: {
            active: true,
          },
          select: {
            order_id: true,
            nft: {
              select: {
                name: true,
                image: true,
                collection: {
                  select: {
                    name: true,
                  },
                },
                AuctionOrder: {
                  select: {
                    ending_date: true,
                    Bids: {
                      select: {
                        bid_amount: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });
        returnOrderObject.push(auctionOrder);
      }
      if (returnOrderObject.length == 0)
        throw new HttpException('No Orders Found', HttpStatus.NOT_FOUND);
      return { ActiveOrder: returnOrderObject };
    } catch (e) {
      return e;
    }
  }

  async findOne(id: string) {
    try {
      let order = await this.prismaService.sellOrder.findUnique({
        where: {
          order_id: id,
        },
        select: {
          price: true,
          active: true,

          nft: {
            select: {
              name: true,
              image: true,
              description: true,
              alternative_Text: true,
              History: {
                select: {
                  price: true,
                  ownerWalletAddress: true,
                  buyerWalletAddress: true,
                },
              },
              NFTMetadata: {
                select: {
                  trait_type: true,
                  trait_value: true,
                },
              },
              collection: {
                select: {
                  collection_address: true,
                  name: true,
                  symbol: true,
                  description: true,
                  short_url: true,
                  banner_image: true,
                  user: {
                    select: {
                      name: true,
                      wallet_address: true,
                      avatar: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      if (!order)
        throw new HttpException('Order Does Not Exist', HttpStatus.NOT_FOUND);
      if (order.nft.History.length == 0) delete order.nft.History;
      return { Order: order };
    } catch (e) {}
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      let updatePrice = await this.prismaService.sellOrder.update({
        where: {
          order_id: id,
        },
        data: {
          price: updateOrderDto.price,
        },
      });
      if (!updateOrderDto)
        throw new HttpException('Price NOt Update', HttpStatus.NOT_MODIFIED);
      return { Message: 'Price Updated', HttpStatus: HttpStatus.CREATED };
    } catch (e) {
      return e;
    }
  }
  //will be triggered once the transaction event is emitted
  async sellNFT(createSellOrderDto: CreateOrderDto) {
    try {
      let createOrder = await this.prismaService.sellOrder.create({
        data: {
          price: createSellOrderDto.price,
          active: true,
          nft_id: createSellOrderDto.nft_id,
          buyerAddress: '',
        },
      });
      if (!createOrder)
        throw new HttpException('Not Put On Sale', HttpStatus.NOT_MODIFIED);
      return { Message: 'Success' };
    } catch (e) {
      return e;
    }
  }
  async sellNFTByAuction(createSellOrderDto: CreateAuctionOrderDto) {
    try {
      let createOrder = await this.prismaService.auctionOrder.create({
        data: {
          minimum_bid: createSellOrderDto.minimum_bid,
          active: true,
          nft_id: createSellOrderDto.nft_id,
          starting_date: new Date(createSellOrderDto.startingDate),
          ending_date: new Date(createSellOrderDto.endingDate),
        },
      });
      if (!createOrder)
        throw new HttpException('Not Put On Auction', HttpStatus.NOT_MODIFIED);
      return { Message: 'Success' };
    } catch (e) {
      return e;
    }
  }
  async buyNFT(order_id: string, buyerAddress: string) {
    try {
      let buyNFT = await this.prismaService.sellOrder.update({
        where: {
          order_id,
        },
        data: {
          buyerAddress,
        },
      });
      if (!buyNFT)
        throw new HttpException('Not Bought', HttpStatus.NOT_MODIFIED);
      return { Message: 'success' };
    } catch (e) {
      return e;
    }
  }
  async placeBid(placeBidDto: PlaceBidDto) {
    try {
      let createBidRecord = await this.prismaService.bids.create({
        data: {
          bid_amount: placeBidDto.bidAmount,
          bidder_wallet_address: placeBidDto.bidderAddress,
          auction_order_id: placeBidDto.auctionOrderId,
        },
      });
    } catch (e) {
      return e;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
