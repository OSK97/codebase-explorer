import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChunksService } from './chunks.service';
import { CreateChunkDto } from './dto/create-chunk.dto';
import { UpdateChunkDto } from './dto/update-chunk.dto';

@Controller('chunks')
export class ChunksController {
  constructor(private readonly chunksService: ChunksService) { }


}
